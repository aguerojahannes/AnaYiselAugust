var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var RequestSchema = new mongoose.Schema({
  name: String,
  username: {type: String, lowercase: true, trim: true, unique: true, required: true},
  email: {type: String, lowercase: true, trim: true, unique: true, required: true}
});

mongoose.model('Request', RequestSchema);
