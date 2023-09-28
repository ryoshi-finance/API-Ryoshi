var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentsModel = new Schema({
	user_address: String,
	message: String,
	type: Number,
	status: Number,
  post_id: String,
	createdAt : {type: Date, default: Date.now}
});

module.exports = mongoose.model('CommentsModel', commentsModel);
