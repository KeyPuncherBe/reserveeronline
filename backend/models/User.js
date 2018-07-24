var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


let UserSchema = new mongoose.Schema({
	username: { type: String, lowercase: true, 
    unique: true },
  role: {type: String, enum: ['user', 'admin'], default: 'user', required: true},
	hash: String,
  salt: String,
  permission: {type: String, required: true, default: 'user'}
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(32).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 
    10000, 64, 'sha512').toString('hex');

}

UserSchema.methods.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 
    10000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign({
        _id: this._id,
        username: this.username,
        role: this.role,
        exp: parseInt(exp.getTime() / 1000),
    }, process.env.RO_BACKEND_SECRET);
  };

mongoose.model('User', UserSchema);