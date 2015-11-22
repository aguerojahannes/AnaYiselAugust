var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var CircleSchema = new mongoose.Schema({
  title: String,
  addContact: String,  //add existing Contact - add person from Social Pages (LinkedIn, FB, Google)
  newContact: [{ //add a new person
    firstName: String,
    lastName: String,
    email: {type: String, lowercase: true, trim: true, required: true},
    profilePic: String,
    phone: String,
    skype: String,
    linkedIn: String,
    facebook: String,
    google: String,
    bio: String
  }],
  members: Array,
  pieces: String,
  created: Date
});

// username: {type: String, lowercase: true, trim: true, unique: true, required: true},
// email: {type: String, lowercase: true, trim: true, unique: true, required: true}

mongoose.model('Circle', CircleSchema);
