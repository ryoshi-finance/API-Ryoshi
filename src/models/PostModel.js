var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postModel = new Schema({
    message: String,
    image: String,
    gif: String,
    user_address: String,
    likes: Array,
	  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('PostModel', postModel);
