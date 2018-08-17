var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var LocalStrategy = require('passport-local').Strategy;




require('./models/User');
require('./models/Product');
require('./models/PurchaseUnit');
require('./models/Order');
require('./models/OrderLine');

require('./config/passport');

let mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reserveeronlinedb');

let User = mongoose.model('User');

require('./models/Product')

var app = express();

let cors = require('cors');
app.use(cors({origin: "*"}));



// passport.use(new LocalStrategy(
//   function (username, password, done) {
//       console.log('user local strategy');
//       User.findOne({ username: username }, function (err, user) {
//           console.log(err);
//           console.log(user);
//           if (err) { return done(err); }
//           if (!user) {
//               console.log('no user');
//               return done(null, false, { message: 'Incorrect username.' });
//           }
//           if (!user.validPassword(password)) {
//               return done(null, false, { message: 'Incorrect password.' });
//           }
//           console.log('inside local strategy');
//           console.log(user);
//           return done(null, user);
//       });
//   }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
