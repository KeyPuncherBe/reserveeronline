var express = require('express');
var router = express.Router();

let userModel = require('../models/User');

let mongoose = require('mongoose');
let User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
      return res.status(400).json(
        {message: 'Please fill out all fields'});
  }
  let user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password)
  console.log(user)
  user.save(function (err){
    console.log("saving user")
      if(err){ console.log("error: " + err);
        return next(err);     
    }
      return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
      return res.status(400).json(
        {message: 'Please fill out all fields'});
  }
  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }
    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
