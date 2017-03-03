let Work = require('../models/Work');
let Tmp = require('../models/tmp');

let startupController = {

	login:function(req, res){

		res.render('login/index', {error:""});
	},

	signup:function(req, res){
		res.render('login/signup', {error:""});
	},

	logout:function(req, res){
		req.session.destroy();
		res.render('login/index', {error:""});
	},

	students:function(req, res){

		Work.find(function(err, projects){
			if(err){
				res.send(err.message);
			}else{
				Tmp.find(function(err, result){
					if(err){
						res.send(err.message);
					}else{
						res.render('login/test', {result});
					}
				})
			}
		})
	}
}

module.exports = startupController;