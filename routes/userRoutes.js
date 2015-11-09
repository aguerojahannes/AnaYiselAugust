var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

router.post('/signUp', function(req, res, next){
	var user = new User(req.body);
	user.setPassword(req.body.password);
	user.save(function(err,result){
		if(err) return next(err);
		if(!result) return next("There was an issue signing up that user.");
		res.send(result.createToken());
	});
});

router.get('/auth/linkedin',
  passport.authenticate('linkedin', {state: '/token'}),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/signin'
}));


module.exports = router;
