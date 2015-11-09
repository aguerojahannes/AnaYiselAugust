var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

// SIGN UP
router.post('/signUp', function(req, res, next){
	var user = new User(req.body);
	user.setPassword(req.body.password);
	user.save(function(err,result){
		if(err) return next(err);
		if(!result) return next("There was an issue signing up that user.");
		res.send(result.createToken());
	});
});

// SIGN UP WITH 3RD PARTY SERVICE
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


// SIGN IN
router.post('/signIn', function(req, res, next){
 console.log("req.body.email: " + req.body.email); // successful
    passport.authenticate('local', function(err, user){
        if(err) return next(err);
        res.send(user.createToken());
    })(req, res, next);
});

createToken = function(){
   return jwt.sign({
      _id: this._id,
      username: this.username,
      email: this.email
   }, "ThisIsASecretCode");
};

module.exports = router;
