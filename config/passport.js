var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
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
  clientID: "75qd8voyucpxtq",
  clientSecret: "JEZ516oAC8ARyDgR",
  callbackURL: "http://127.0.0.1:3000/api/user/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true,
  passReqToCallback: true
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    User.findOne({
      'linkedIn': profile.id
    }, function(err, user) {
        // console.log("DEBUG: Contents of profile:") ;
        if (err) {
          console.log('DEBUG: Error connecting');
          return done(err);
        }
        if (user) {
          console.log('DEBUG: Current user');
          // console.log('user', req.body)
          req.tempUser  = user;
          return done(null, user);
        }
        // Else no user is found. We need to create a new user.
        else {

          var newUser = new User();
          newUser.linkedInId = profile.id;
          // According to the Google API, the name is in
          // displayName
          newUser.username = profile.displayName;

          newUser.email = profile.emails ? profile.emails[0].value : null;

          // Photo
          // newUser.image = generateLinkedInPhotoUrl(profile.photos[0].value, 500);;
          newUser.image = profile.photos[0].value, 500;

          // Created stores date created in the database.
          newUser.createdDate = new Date();

          // Save the newUser to the database.
          newUser.save(function(err) {
            if (err)
              throw err;
            // Otherwise return done, no error and newUser.
            req.tempUser = newUser;
            return done(null, newUser);
          })
        }
      });


});
}));

