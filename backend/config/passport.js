var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log('local strategy');
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }));

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.RO_BACKEND_SECRET;

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log('using jwt strategy');
    console.log(jwt_payload._id);

    User.findOne({ _id: jwt_payload._id }, function (err, user) {
        if (err) {
            console.log('error in jwt');
            return done(err, false);
        }
        if (user) {
            console.log('user found');
            console.log(user);
            return done(null, user);
        } else {
            console.log('else in jwt');
            return done(null, false);
            // or you could create a new account
        }
    });
}));