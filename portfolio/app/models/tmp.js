var mongoose = require('mongoose');

var tmpSchema = mongoose.Schema({
	username:{type:String, required:true}
})

var Project = mongoose.model("tmp", tmpSchema);

module.exports = Project;