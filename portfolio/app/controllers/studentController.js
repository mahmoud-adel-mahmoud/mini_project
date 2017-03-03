let Student = require('../models/Student');
let Upload  = require('../models/Upload');
let Work = require('../models/Work');
let Desc = require('../models/Description');
let Tmp = require('../models/tmp');

let studentController = {

	signupConfirm:function(req, res){
		
		Student.find({username:req.body.signupUsername}, function(err, result){

			if(result.length == 0){
				if(req.body.signupPassword != req.body.signupConfirm){
					res.render('login/signup', {error:"Password Mismatch"});
				}else{
					var student = new Student({username:req.body.signupUsername, password:req.body.signupPassword});
					student.save(function(err, result){
						if(err){
							res.send(err.message);
						}else{
							res.render('login/index', {error:"You Registered Successfully"});
						}
					})
				}
			}else{
				res.render('login/signup', {error:"Username Taken"});
			}
		})
	},

	loginConfirm:function(req, res){

		Upload.find({username:req.body.loginUsername}, function(err, result){
			if(err){
				res.send(err.message);
			}else{
				if(result.length != 0){
					req.session.url = result[0].url;
				}
			}
		})

		Student.find({username:req.body.loginUsername}, function(err, result){
			if(result.length == 0){
				res.render('login/index', {error:"You are not registered"});
				
			}else{
				if(req.body.loginPassword == result[0].password){
					req.session.username = result[0].username;
					res.render('profile/about', {error:"Successfull login", user:req.body.loginUsername, url:req.session.url});
				}else{
					res.render('login/index', {error:"Wrong Password"});
				}
			}
		})
	},

	uploadPhoto:function(req, res){

		Upload.find({username:req.session.username}, function(err, result){
			if(result.length != 0){
				res.render('profile/upload', {error:"You Already Uploaded a Photo"})
			}else{
				if(req.body.uploadURL.length == 0){
					res.render('profile/upload', {error:"URL Field is EMPLTY!"});
				}else{
					var student = new Upload({username:req.session.username, url:req.body.uploadURL});
					student.save(function(err, result){
					if(err){
						res.send(err.message);
					}else{
						req.session.url = result.url;
						res.render('profile/about', {error:"Upload Successfull", user:req.session.username, url:req.body.uploadURL});
				}
			})
		}
			}
		})
	},

	uploadWork:function(req, res){

		var student = new Work({username:req.session.username, title:req.body.uploadTitle, link:req.body.uploadLink});
		student.save(function(err, result){
			if(err){
				res.send(err.message);
			}else{
				if(req.session.desc){
					var desc = new Desc({username:req.session.username, description:req.body.desc, name:req.body.name});
					desc.save(function(err, result){
						if(err){
							res.send(err.message);
						}else{
							var tmp = new Tmp({username:req.session.username});
							tmp.save(function(err, res){
								if(err){
									res.send(err.message);
								}
							})
							res.render('profile/work', {error:"Upload Successfull", desc:""});
						}
					})
				}else{
					res.render('profile/work', {error:"Upload Successfull", desc:""});
				}
			}
		})
	}

}

module.exports = studentController;