var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var hotModel = new Schema({
	pair: String,
  token: String,
  defi: String,
  data: Number,
	name: String,
	network: String,
  createdAt : {type: Date, default: Date.now}
});

module.exports = mongoose.model('HotModel', hotModel);
