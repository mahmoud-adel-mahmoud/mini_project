//require dependecies
var express = require('express');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var DB_URI = "mongodb://localhost:27017/portfolio";
var path = require('path');

var app = express();

app.set('view engine', 'ejs');

//configure app
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/views/login')));
app.use(express.static(path.join(__dirname + '/views/profile')));
app.use(session({resave: true, saveUninitialized: true, secret: "btbos 3ala eh!"}));

mongoose.connect(DB_URI);
app.use(router);

//start the server
app.listen(8080, function(){
	console.log("Server is Listening on port 8080");
});