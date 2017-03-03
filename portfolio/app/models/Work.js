var mongoose = require('mongoose');

var workSchema = mongoose.Schema({
	username:{type:String, required:true},
	title:{type:String, required:true},
	link:{type:String, required:true}
})

var Project = mongoose.model("work", workSchema);

module.exports = Project;