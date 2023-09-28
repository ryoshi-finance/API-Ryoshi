var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenModel = new Schema({
  address: String,
	tokenSymbol: String,
	name: String,
	symbol: String,
  totalSupply: String,
  holdersCount: Number,
	decimals: String,
  website: String,
  facebook: String,
  telegram: String,
  twitter: String,
  image: String,
  coingecko: String,
  information: Array,
  createdAt: Date
});

module.exports = mongoose.model('TokensErc20', tokenModel);
