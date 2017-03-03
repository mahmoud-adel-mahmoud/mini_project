//require dependencies
var express = require('express');
var router = express.Router();
var projectController = require('./controllers/projectController');
var startupController = require('./controllers/startupController');
var studentController = require('./controllers/studentController');
var profileController = require('./controllers/profileController');

//add routes
//router.get('/', startupController.login);

router.get('/', startupController.login);

router.get('/signup', startupController.signup);

router.get('/login', startupController.login);

router.get('/logout', startupController.logout);

router.get('/about', profileController.aboutMe);

router.get('/portfolio', profileController.portfolio);

router.get('/upload', profileController.upload);

router.get('/test', startupController.students);

router.get('/work', profileController.work);

router.post('/summary', profileController.summary);

router.post('/register', studentController.signupConfirm);

router.post('/project', projectController.createProject);

router.post('/profile', studentController.loginConfirm);

router.post('/uploadWork', studentController.uploadWork);

router.post('/upload', studentController.uploadPhoto);

//export router
module.exports = router;