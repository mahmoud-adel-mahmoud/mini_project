let Work = require('../models/Work');
let Desc = require('../models/Description');

let profileController = {

	aboutMe:function(req, res){
		res.render('profile/about', {error:"", user:req.session.username, url:req.session.url});
	},

	portfolio:function(req, res){
		Work.find({username:req.session.username}, function(err, result){
			if(err){
				res.send(err.message);
			}else{
				if(result.length == 0){
					res.render('profile/portfolio', {result, error:"x", desc:""});
				}else{
					var descr;
					Desc.find({username:req.session.username}, function(err, result1){
						if(err){
							res.send(err.message);
						}else{
							descr = result1[0].description;
							res.render('profile/portfolio', {result, error:"", desc:descr});
						}
					})
				}
				
			}
		})
	},

	upload:function(req, res){
		res.render('profile/upload', {error:""});
	},

	work:function(req, res){
		Desc.find({username:req.session.username}, function(err, result){
			if(err){
				res.send(err.message);
			}else{
				if(result.length == 0){
					req.session.desc = true;
					res.render('profile/work', {error:"", desc:"x"});
				}else{
					res.render('profile/work', {error:"", desc:""});
				}
			}
		})
	},

	summary:function(req, res){
		var tmpDesc;
		var name;
		var count;
		Work.find({username:req.body.user}, function(err, result){
			if(err){
				res.send(err.message);
			}else{
				Desc.find({username:req.body.user}, function(err, desc){
					if(err){
						res.send(err.message);
					}else{
						tmpDesc = desc[0].description;
						name = desc[0].name;
						if(result.length == 1){
							count = 1;
							res.render('login/summary', {result, tmpDesc, name, count});
						}else{
							count = 2;
							res.render('login/summary', {result, tmpDesc, name, count});
						}
						
					}
				})
			}
		})
	}
}

module.exports = profileController;