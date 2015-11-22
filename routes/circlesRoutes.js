var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Circle = mongoose.model('Circle');
var Contact = mongoose.model('Contact');
var User = mongoose.model('User');
var passport = require('passport');
// var jwt = require('express-jwt');
// var auth = jwt({
//   userProperty:'payload',
//   secret: "ThisIsASecretCode"
// });

//------ADD CONTACTS IN CIRCLE ---------------------
// router.post('/', function(req, res, next) {
//   console.log(req.body);
//   var contact = new Contact(req.body);
//       contact.save(function(err, result) {
//       if(err) return next(err);
//       res.send(result);
//     });
//   });

//------- POST Circle Form to the Data Base.-------------
router.post('/', function(req, res, next){
  console.log(req.body.chartData);
  console.log(req.body.chartTitle);
  var circle = new Circle(req.body);
      circle.created = new Date;
      circle.save(function(err, result){
        if(err) return next(err);
        res.send(result);
      });
    });

//-----------GET CIRCLES FROM DATA BASE -------------------
router.get('/', function(req, res, next){
  Circle.find({}, function(err, result){
    if(err) return(err);
    res.send(result);
  });
});


module.exports = router;
