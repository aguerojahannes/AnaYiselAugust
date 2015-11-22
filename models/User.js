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
  linkedIn: {
    id: String,
    token: String, // delete this later. don't want client to be able to access this.
    email: String,
    firstName: String,
    lastName: String,
    photo: String,
    summary: String,
    profileUrl: String,
  },
  linkedInUrl: String,
  facebook: {
    id: String,
    token: String,
    email: String,
    firstName: String,
    lastName: String,
    photo: String,
    summary: String,
    profileUrl: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    firstName: String,
    lastName: String,
    photo: String,
    summary: String,
    profileUrl: String,
  },
  jobTitle: String,
  keyword: [{name: String, description: String}], //skills
  bio: String,
  circles: Array,
  notifications: Array,
  friends: Array,
  joined: String
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
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      keyword: this.keyword, //skills
      profilePic: this.profilePic,
      username: this.username,
      notifications: this.notifications,
      circles: this.circles,
      friends: this.contacts
   }, "ThisIsASecretCode");
};


mongoose.model('User', UserSchema);
