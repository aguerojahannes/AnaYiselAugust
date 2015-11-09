var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var ContactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: {type: String, lowercase: true, trim: true, required: true},
  email: {type: String, lowercase: true, trim: true, unique: true, required: true},
  phone: String,
  skype: String,
  linkedIn: String,
  facebook: String,
  bio: String

});

mongoose.model('Contact', ContactSchema);