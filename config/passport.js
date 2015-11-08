var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var env = require("dotenv");
var mongoose = require("mongoose");
var User = mongoose.model("User");


passport.use(new LocalStrategy(function(username, password, done){
   User.findOne({username: username}, function(err, user){
      if(err) return done(err);
      if(!user) return done("Could not find user in the database.");
      if(!user.checkPassword(password)) return done("Incorrect password.");
      return done(null, user);
   });
}));

// may need to use local token?
passport.use(new LinkedInStrategy({
  clientID: "75qd8voyucpxtq", // env.CLIENTID || process.env['linkedin.CLIENTID'],
  clientSecret: "JEZ516oAC8ARyDgR", //env.CLIENTSECRET || process.env['linkedin.CLIENTSECRET'],
  callbackURL: env.CALLBACKURL || process.env['linkedin.CALLBACKURL'],
  // callbackURL: "/auth/linkedin/callback",  // write http://localhost:3000/auth/linkedin/callback
  scope: ['r_emailaddress', 'r_basicprofile', 'w_share'],
//  state: true
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}));

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });