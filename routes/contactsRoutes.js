var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Contact = mongoose.model('Contact');
var passport = require('passport');

// Get All Contacts
router.get('/', function(req, res, next) {
  Contact.find({}).sort({ "firstName": 'ascending'}).exec(function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

// Add Contact
router.post('/', function(req, res, next) {
  var contact = new Contact(req.body);
  contact.save(function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

// Edit Contact
router.put('/', function(req, res, next) {
  Contact.update({_id: req.body._id}, req.body, function (err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

// Delete Contact
router.delete('/:id', function(req, res, next) {
  Contact.remove({_id: req.params.id}, function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

module.exports = router;
