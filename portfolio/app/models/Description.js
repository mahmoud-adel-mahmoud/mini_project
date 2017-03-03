var mongoose = require('mongoose');

var descSchema = mongoose.Schema({
	username:{type:String, required:true},
	description:{type:String, required:true},
	name:{type:String, required:true}
})

var Project = mongoose.model("desc", descSchema);

module.exports = Project;