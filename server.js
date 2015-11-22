if(process.env.NODE_ENV !== "production"){
		require("dotenv").load();
}

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
require("./models/User");
require("./models/Contact");
require("./models/Request");
require("./models/Circle");
require("./config/passport");

// DATABASE CONNECTION
mongoose.connect("mongodb://localhost/anayiselaugust");
// var database = process.env.MONGOLAB || "mongodb://localhost/FailedMongoLab";
// console.log(database);
// mongoose.connect(database, function(err){
// 	console.log("Connect");
// 	if(err) return console.log('error connecting to %s', database);
// 	console.log('connected to %s', database);
// });



app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

// MIDDLEWARE
app.use(session({ secret: 'session secret key', cookie: {secure: false} })); // if using http on routes, true is fine. making sure links match on callback url.
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ROUTE LINKS
var userRoutes = require('./routes/userRoutes');
var contactsRoutes = require('./routes/contactsRoutes');
var circlesRoutes = require('./routes/circlesRoutes');
var requestsRoutes = require('./routes/requestsRoutes');

//-------to allow remote access--------------------------------------------------------
// using this for ionic http req
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  next();
});

//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

// Use Routes

// app.use("/user", userRoutes);
app.use("/contacts", contactsRoutes);
app.use("/api/circles", circlesRoutes);
app.use("/requests", requestsRoutes);
app.use("/api/user", userRoutes);



// Handle Errors
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(400).send(err);
});

var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('App listening at http://localhost:' + port);
});
