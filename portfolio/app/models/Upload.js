var mongoose = require('mongoose');

var uploadSchema = mongoose.Schema({
	username:{type:String, required:true, unique:true,},
	url:{type:String, required:true,}
})

var Project = mongoose.model("upload", uploadSchema);

module.exports = Project;