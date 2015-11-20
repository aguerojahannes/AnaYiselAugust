var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var passport = require('passport');
var cloudinary = require('cloudinary'); //Works with UPLOAD PHOTO
var fileParser = require('connect-multiparty')();
var multiparty = require('multiparty'); //Works with UPLOAD PHOTO
var linkedIn = require("passport-linkedin-oauth2");
var nodemailer = require('nodemailer') ;


//---------------ADD THIS TO WORK WITH RESET PASSWORD ------------------
// var async = require('async');
var crypto = require('crypto');

var auth = jwt({
	userProperty: "payload",
	secret: "ThisIsASecretCode"
});
// -----------------------------END-----------------------------------

//--------------------CLOUDINARY - UPLOAD PHOTO----------------------------------
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME || env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY || env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET || env.CLOUDINARY_SECRET
});

router.post('/uploadPhoto', function(req, res){
	console.log("hit photo");
	var form = new multiparty.Form();
	form.parse(req, function(err, data, fileObject){
		console.log(fileObject);
		cloudinary.uploader.upload(fileObject.file[0].path, function(picInfo){
			User.update({_id: data.userId[0]}, {profilePic: picInfo.url}, function(err, updateUser){
				if(err) return res.status(500).send({err: "Sorry, could not find that user."});
				if(!updateUser) return res.status(500).send({err: "Error."});
				res.send(updateUser);
				console.log(updateUser);
			})
		})
	})
})

// router.post('/upload', fileParser, function(req, res){
//   /* The `req.files` property will be populated because we
//    * used the 'fileParser' middleware for this route.
//    *
//    * The 'name' attribute from the file input in your form will match the
//    * property name on `req.files`.
//    * So since we have <input type='file' name='image' /> in our form,
//    * there is a `req.files.image` property available.
//    */
//   var imageFile = req.files.image;
//
//   cloudinary.uploader.upload(imageFile.path, function(result){
//     /*
//      * After a successful upload, the callback's `result` argument
//      * will be a hash (javascript object) with a property `url`
//      * that you can use to display the uploaded image.
//      * To learn more about the format of the `result` hash, see:
//      *   http://cloudinary.com/documentation/node_image_upload
//      */
//
//     if (result.url) {
//       /*
//        * This would be a good spot to save this url (perhaps into a
//        * mongo database) so that you can display it later.
//        */
//       res.render('upload', {url: result.url});
//     } else {
//       /*
//        * There was an error and the file did not upload.
//        */
//
//       console.log('Error uploading to cloudinary: ',result);
//       res.send('did not get url');
//     }
//   });
// });


//-------------------------NODEMAILER - FORGOT PASSWORD- Look at Jose's Project ----------------
router.post('/forgot', function(req, res, next) {
	var smtpTransport = nodemailer.createTransport("SMTP", {
		service: "Gmail",
		auth: {
			user: "getful.team@gmail.com",
			pass: "anayiselaugust123"
		}
	}) ;
	var rand, mailOptions, host, link ;

	rand = Math.floor((Math.random() * 100) + 54) ;
	email = req.body.email ;

	// Look for user on db
	User.findOne({ email : email }, function(err, user) {
		if(err) console.log(err) ;
		if(err) return res.status(500).send({ err: "Issues with the server" }) ;
		if(!user) {
			return res.send("Error: No account with that email address.") ;
		}

		host = req.get('host') ;
		link = 'http://' + host + '/#/resetPassword/' + user._id ;
		console.log("user._id: " + user._id);
// // SPANISH LINK
// 		host = req.get('host') ;
// 		link = 'http://' + host + '/#/resetPasswordEs/' + user._id ;
// 		console.log("user._id: " + user._id);


		mailOptions = {
			to: email,
			subject: "GetFul Password Reset",
			html : '<div style="color:Gray;"><br/> Hi there, <br/><br/> You recently requested a Password Change for your GetFul account. Now, you can go at this link and Reset the Password.<br/><br/> <center><a href="' + link + '"> CHANGE YOUR PASSWORD HERE! </a></center> <br/><br/>Thanks!<br/>-The GetFul Team <br/></div>'
		}
// // EMAIL IN SPANISH
// 		mailOptions = {
// 			to: email,
// 			subject: "GetFul - Cambiar Contraseña",
// 			html : '<div style="color:Gray;"><br/> Hola, <br/><br/> Recientemente solicitó un cambio de Contraseña para su cuenta de GetFul. Puede modificar su contraseña a una nueva a través del siguiente enlace.<br/><br/> <center><a href="' + link + '"> CAMBIAR CONTRASEÑA AQUÍ </a></center> <br/><br/>Gracias!<br/>-El Equipo de GetFul <br/></div>'
// 		}

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


//-----------------RESET PASSWORD--------------------------
router.put('/resetPassword/:id', function(req, res) {
	User.findOne({ _id : req.body.id }, function(err, user) {
		if(err) console.log(err);
		if(err) return res.status(500).send({ err: "Issues with the server" });
		if (!user) {
			return res.send("Error: Not found.");
		}
		console.log(req.body);
		user.setPassword(req.body.password);
		User.update({ _id: req.body.id }, user)
		.exec(function(err, user) {
			if(err);
			if(!user);
			res.send(user);
		})
		});
	});

	// router.put('/:id', function(req, res) {
	// 	User.findOne({ _id : req.body.id }, function(err, user) {
	// 		if(err) console.log(err);
	// 		if(err) return res.status(500).send({ err: "Issues with the server" });
	// 		if (!user) {
	// 			return res.send("Error: Not found.");
	// 		}
	// 		console.log(req.body);
	// 		user.setPassword(req.body.password);
	// 		User.update({ _id: req.body.id }, user)
	// 		.exec(function(err, user) {
	// 			if(err);
	// 			if(!user);
	// 			res.send(user);
	// 		})
	// 		});
	// 	});


//---------------------- SIGN UP WITH 3RD PARTY SERVICE----------------------

// this is the check to see if we have proper linkedin credentials
router.get('/auth/linkedin',
  passport.authenticate('linkedin', {scope: ["r_basicprofile", "r_emailaddress"]})); // this is a callback
console.log("Made it after the first get");

// result
router.get('/auth/linkedin/callback',
	passport.authenticate('linkedin', {failureRedirect: '/'}),
	function(req, res){
		if(req.user){
			console.log(req);
			req.user.createToken(); // generating token
			res.redirect("/#/profile/" + req.user._id);
		} else {
			res.send("You are not authenticated.");
		}
	});


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


// ------------- ACCOUNT ROUTES ----------------------------
router.delete("/:id", function(req, res, next){
	User.remove({_id: req.params.id}, function(err, result){
		if(err) return next(err);
		res.send(result);
	console.log("result: " + result);

	});
});

// --------------- PROFILE ROUTES -----------------
// --------------------------------------------------------------
router.get("/:id", function(req, res, next){
	User.findOne({_id: req.params.id}, function(err, result){
		if(err) return next(err);
		res.send(result);
	});
});

router.put("/:id", function(req, res, next){
	User.update({_id: req.params.id}, req.body, function(err, result){
		if(err) return next(err);
		res.send(result);
	});
});



module.exports = router;
