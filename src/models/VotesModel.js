var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var votesModel = new Schema({
  address: String,
	pair: String,
	ip: String,
	type: Boolean,
  createdAt : {type: Date, default: Date.now}
});

module.exports = mongoose.model('VotesModel', votesModel);
