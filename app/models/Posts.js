var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Types.ObjectId

mongoose.connect("mongodb://localhost/test");

var Post_Schema = new Schema({

	title: {type: String},
	summary: {type: String}
	post: {type: String},
	date: {type: Date, default: Date.now},
	tags: {type: [String]}
});

var Posts = mongoose.model('Tattle', Post_Schema);

exports.mongoose = mongoose;
exports.schema = Schema;
exports.model = Posts;
exports.objectId = ObjectId;