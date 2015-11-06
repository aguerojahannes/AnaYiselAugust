var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  name: String,
  username: {type: String, lowercase: true, trim: true, unique: true, required: true},
  email: {type: String, lowercase: true, trim: true, unique: true, required: true},
  passwordHash: String,
  salt: String,
});

mongoose.model('User', UserSchema);
