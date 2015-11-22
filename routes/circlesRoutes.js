var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Circle = mongoose.model('Circle');
var User = mongoose.model('User');
var passport = require('passport');


// Get All Circles
router.post('/get', function(req, res, next) {
  Circle.find({creator: req.body.user}).sort({ "firstName": 'ascending'}).exec(function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

// Add Circles
router.post('/', function(req, res, next) {
  var circle = new Circle();
  circle.members = req.body;
  circle.save(function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

// Edit Circles
router.put('/', function(req, res, next) {
  Circle.update({_id: req.body._id}, req.body, function (err, result) {
    if(err) return next(err);
    res.send(result);
  });
});

// Delete Circles
router.delete('/:id', function(req, res, next) {
  Circle.remove({_id: req.params.id}, function(err, result) {
    if(err) return next(err);
    res.send(result);
  });
});



module.exports = router;
