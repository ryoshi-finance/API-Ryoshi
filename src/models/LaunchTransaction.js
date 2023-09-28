var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var launchTransaction = new Schema({
    address: String,
    transaction_id: String,
    transaction_type: String,
    amount_mdex: String,
    amount_bnb: String,
    token_address: String,
	  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Launchpad', launchTransaction);
