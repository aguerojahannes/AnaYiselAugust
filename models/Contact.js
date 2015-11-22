var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var ContactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type: String, lowercase: true, trim: true, unique: true, required: true},
  profilePic: String,
  phone: String,
  skype: String,
  linkedIn: String,
  facebook: String,
  google: String,
  bio: String,
  creator: String,
  title: String,
  skills: Array,
  bio: String
  //  businessCardPic: String       //ADD BUSINESS CARD PHOTO IN THE SCHEMA.

});

mongoose.model('Contact', ContactSchema);
