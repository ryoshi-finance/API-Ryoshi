var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokensModels = new Schema({
	data: Array,
	address: String
});

module.exports = mongoose.model('TokensModels', tokensModels);
