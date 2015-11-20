var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
var env = require("dotenv");
var mongoose = require("mongoose");
var User = mongoose.model("User");

//-----------------LOCAL STRATEGY - AUTHENTICATION-----------------------
passport.use(new LocalStrategy({usernameField: 'email'} ,function(email, password, done){
   User.findOne({email: email}, function(err, user){
      if(err) return done(err);
      if(!user) return done("Could not find user's email in the database.");
      if(!user.checkPassword(password)) return done("Incorrect password.");
      return done(null, user);
   });
}));

// //--------------- LINKEDIN STRATEGY - AUTHENTICATION------------------------
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// may need to use local token? don't think so.
passport.use(new LinkedInStrategy({
	// athenticating my app, telling linked in who we are as the developers
  consumerKey: "75qd8voyucpxtq",
  consumerSecret: "JEZ516oAC8ARyDgR",
  callbackURL: "/api/user/auth/linkedin/callback", // going to the routes
  // state: true,
  profileFields: ['id', 'first-name', 'last-name', 'email-address', 'summary', 'picture-urls::(original)', 'public-profile-url', 'connections'],
  // state: true,
  // passReqToCallback: true
}, function(accessToken, refreshToken, profile, done) {
  // process.nextTicket is a Node.js function for asynchronous verification
  // Waits for data to come back before continuing
  console.log("Made it above the process.nextTick()");
  process.nextTick(function () {
    // Information for access our database. Whatever is return will be store in profile. Returns err is it cannot connect.
    User.findOne({
      'linkedIn.id': profile.id
    }, function(err, user) {
        if (err) {
          console.log('DEBUG: Error connecting');

          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        // Else no user is found. We need to create a new user.
        else {
        	console.log("DEBUG: New User.");
        	console.log("THIS IS THE profile: " + profile);

          var newUser = new User();
          // console.log("newUser: " + newUser);

          newUser.linkedIn.id = profile.id;
          newUser.linkedIn.token = accessToken;

          newUser.linkedIn.name = profile.name.givenName;
          newUser.linkedIn.lastName = profile.name.familyName;

          newUser.firstName = newUser.linkedIn.name;
          newUser.lastName = newUser.linkedIn.lastName;

          newUser.linkedIn.email = profile.emails[0].value;

          // setting username to email from linkedIn
          newUser.email = newUser.linkedIn.email;

          // console.log("line 80 profile:" + profile);
          newUser.linkedIn.friends = profile.name.connections;


          // Photo
          // Photo returned by linkedIn is 200x2000, because of picture.type(large) in profileFrields above.
	// console.log(profile.pictureUrls);
	// newUser.linkedin.photo = profile.pictureUrls.values[0] ;
	// newUser.pic = newUser.linkedin.photo;
	// Getting bigger photo URL from linkedin
	// Sending size 300x300.
	// console.log("profile.publicProfileUrl: " + profile.publicProfileUrl); //undefined
          newUser.linkedIn.profileUrl = profile.publicProfileUrl;
          newUser.linkedInUrl = newUser.linkedIn.profileUrl;

          newUser.linkedIn.summary = profile._json.summary;
          newUser.summary = newUser.linkedIn.summary;

          // Created stores date created in the database.
          newUser.joined = new Date();

          // Save the newUser to the database.
          newUser.save(function(err) {
            if (err)
              throw err;
            // Otherwise return done, no error and newUser.
            return done(null, newUser);
          })
        }
      });


});
}));

