var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Request = mongoose.model('Request');
var passport = require('passport');

// Get All Requests
router.get('/', function(req, res, next) {
  Request.find({ 'privacy': 'Global'}).exec(function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

// Add Request
router.post('/', function(req, res, next) {
  var request = new Request(req.body);
  request.save(function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

// Edit Request
router.put('/', function(req, res, next) {
  Request.update({_id: req.body._id}, req.body, function (err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

// Delete Contact
router.delete('/:id', function(req, res, next) {
  Request.remove({_id: req.params.id}, function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

module.exports = router;
