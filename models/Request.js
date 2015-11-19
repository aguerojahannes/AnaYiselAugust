var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var RequestSchema = new mongoose.Schema({
  name: String,
  email: {type: String, lowercase: true, trim: true},
  title: String,
  body: String,
  skills: Array,
  privacy: String,
  selectPrivacy: Array // Additional list of people who can see this
});

mongoose.model('Request', RequestSchema);
