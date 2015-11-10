var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  firstName: {type: String, required: true, unique: false},
  lastName: {type: String, required: true, unique: false},
  email: {type: String, lowercase: true, trim: true, unique: true, required: true},
  passwordHash: String,
  salt: String,
  profilePic: String,
  phoneNumber: String,
  language: String,
  linkedIn: String,
  facebook: String,
  google: String,
  jobTitle: String,
  keyword: [{name: String, description: String}],
  bio: String,
  circles: Array,
  friends: Array
});

UserSchema.methods.setPassword = function(password){
   this.salt = crypto.randomBytes(16).toString("hex");
   this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
};

UserSchema.methods.checkPassword = function(password){
   var passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
   return (passwordHash === this.passwordHash);
};

// console.log("above createToken()");
UserSchema.methods.createToken = function(){
   return jwt.sign({
      _id: this._id,
      username: this.username,
      email: this.email
   }, "ThisIsASecretCode");
};


mongoose.model('User', UserSchema);
