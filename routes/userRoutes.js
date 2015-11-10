var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var passport = require('passport');
var nodemailer = require('nodemailer') ;


//---------------ADD THIS TO WORK WITH RESET PASSWORD ------------------
// var async = require('async');
// var crypto = require('crypto');

var auth = jwt({
	userProperty: "payload",
	secret: "ThisIsASecretCode"
});
// -----------------------------END-----------------------------------


//-------------------------NODEMAILER - FORGOT PASSWORD- Look at Jose's Project ----------------
router.post('/forgot', function(req, res, next) {
	var smtpTransport = nodemailer.createTransport("SMTP", {
		service: "Gmail",
		auth: {
			user: "anayiselaugust@gmail.com",
			pass: "anayiselaugust123"
		}
	}) ;
	var rand, mailOptions, host, link ;

	rand = Math.floor((Math.random() * 100) + 54) ;
	email = req.body.username ;

	// Look for user on db
	User.findOne({ username : email }, function(err, user) {
		if(err) console.log(err) ;
		if(err) return res.status(500).send({ err: "Issues with the server" }) ;
		if(!user) {
			return res.send("Error: No account with that email address.") ;
		}

		host = req.get('host') ;
		link = 'http://' + host + '/#/PasswordReset/' + user._id ;

		mailOptions = {
			to: email,
			subject: "Password Reset",
			html : 'Please click on the link to reset your password.<a href="' + link + '">Click here to reset</a>'
		}

		smtpTransport.sendMail(mailOptions, function(error, response) {
			if(error) {
				console.log(error) ;
				res.end("error") ;
			} else {
				console.log("Message sent: " + response.message) ;
				res.end("sent") ;
			}
		});
	}) ;
}) ;
//---------------------------- END NODEMAIL FORGOT PASSWORD ----------------

// //RESET PASSWORD
// router.put('/resetPassword/:id', function(req, res) {
// 	User.findOne({ _id : req.body.id }, function(err, user) {
// 		if(err) console.log(err) ;
// 		if(err) return res.status(500).send({ err: "Issues with the server" }) ;
// 		if (!user) {
// 			return res.send("Error: Not found.") ;
// 		}
// 		user.setPassword(req.body.password) ;
// 		User.update({ _id: req.body.id }, user)
// 		.exec(function(err, user) {
// 			if(err) ;
// 			if(!user) ;
// 			res.send(user) ;
// 		}) ;
// 	}) ;


//---------------------- SIGN UP WITH 3RD PARTY SERVICE----------------------
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


// -------------------------SIGN UP---------------------------------------
router.post('/signUp', function(req, res, next){
	var user = new User(req.body);
	user.setPassword(req.body.password);
	user.save(function(err,result){
		if(err) return next(err);
		if(!result) return next("There was an issue signing up that user.");
		res.send(result.createToken());
	});
});
//-------------------------- SIGN IN -------------------------------
router.post('/signIn', function(req, res, next){
	// console.log("req.body.email: " + req.body.email); // successful
 // 	console.log("req.body.password: " + req.body.password); // successful
    passport.authenticate('local', function(err, user){
        if(err) return next(err);
				console.log("inside sign in");
        res.send(user.createToken());
    })(req, res, next);
});


module.exports = router;
