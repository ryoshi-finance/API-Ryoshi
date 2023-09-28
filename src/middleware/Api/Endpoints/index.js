import express from 'express';
const r = express.Router();
const rateLimit = require("express-rate-limit");
//const verify = require('../../../modules/LoginVerify');

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 15 minutes
  max: 1 // limit each IP to 100 requests per windowMs
});

/**
 * Methods Get Default
*/
r.route('/')
.get(require('./home'));


/**
 * Methods Register User
*/
r.route('/credential')
.post(require('./credential'));





/*
 * Method get BTC
*/
r.route('/btc')
.post(require('./btc'));


/*
 * Method get BTC
*/
r.route('/bch')
.post(require('./bch'));



/*
 * Method get DOGE
*/
r.route('/doge')
.post(require('./doge'));


/*
 * Method get ETH
*/
r.route('/eth')
.post(require('./eth'));


/*
 * Method get LTC
*/
r.route('/ltc')
.post(require('./ltc'));


/*
 * Method get XMR
*/
r.route('/xmr')
.post(require('./xmr'));


/*
 * Method get IOTA
*/
r.route('/iota')
.post(require('./iota'));


/*
 * Method get PPC
*/
r.route('/ppc')
.post(require('./ppc'));




/*
 * Method get XRP
*/
r.route('/xrp')
.post(require('./xrp'));



/*
* New transactions all cryptocurrency
*/
r.route('/transfer/eth')
.post(require('./transfers/eth-transfer'));


r.route('/transfer/btc')
.post(require('./transfers/btc-transfer'));


r.route('/transfer/bch')
.post(require('./transfers/bch-transfer'));


r.route('/transfer/bch')
.post(require('./transfers/bch-transfer'));


/*
* New transactions all cryptocurrency
*/





/*
* Calculate Fees Transactions in Cryptocurrency
*/

r.route('/calculate/btc')
.get(require('./calculate/btc'));



/* CREATE TOKENS ERC-20 IN ETHEREUM */


//List all tokens
r.route('/tokens')
.get(require('./tokens/tokens'));


//Create new token
r.route('/tokens/new')
.post(require('./tokens/new-token'));


//Balance in token
r.route('/tokens/balance')
.post(require('./tokens/balance-token'));


//Calculate gas in eth
r.route('/tokens/calculate')
.post(require('./tokens/calculate-eth'));

//Calculate gas in Token Eth
r.route('/tokens/calculate-token')
.post(require('./tokens/calculate-token'));



/*
* New transaction in erc-20 tokens eth
*/

r.route('/transfer/tokens')
.post(require('./tokens/transfer-tokens'));


/* CREATE TOKENS ERC-20 IN ETHEREUM */





/*
* BINANCE
*/

r.route('/binance/buy')
.post(require('./buy'));

r.route('/binance/prices')
.get(require('./prices'));

r.route('/binance/candles')
.post(require('./candles'));

r.route('/binance/trades')
.post(require('./trades'));

r.route('/binance/stats')
.post(require('./stats'));

r.route('/binance/agvprice')
.post(require('./agvprice'));

r.route('/binance/getorder')
.post(require('./getorder'));

r.route('/binance/allorder')
.post(require('./allorder'));

r.route('/binance/withdraw')
.post(require('./withdraw'));


r.route('/binance/withdrawhistory')
.post(require('./withdrawhistory'));


/*
* BINANCE
*/


/*
* COINMARKETCAP
*/



/*
* COINMARKETCAP
*/

r.route('/coinmarketcap')
.get(require('./coinmarketcap'));


r.route('/coinmarketcap/global')
.get(require('./coinmarketcap/global'));

r.route('/coinmarketcap/tokens/:address')
.get(require('./coinmarketcap/tokens'));


/*
* COINMARKETCAP
*/


/*
* COINMARKETCAP
*/

r.route('/fixer')
.get(require('./fixer'));

/*
* COINMARKETCAP
*/


/*
* CRON
*/

r.route('/cron/coinmarketcap')
.get(require('./cron'));

r.route('/cron/fixed')
.get(require('./cron/fixer'));

r.route('/cron/news')
.get(require('./cron/news'));

r.route('/cron/global')
.get(require('./cron/global'));


/*
* CRON
*/




/*
* NEWS
*/


r.route('/news/')
.get(require('./news/'));


/*
* NEWS
*/

/*
* ETHERSCAN
*/

r.route('/etherscan/history')
.post(require('./etherscan/history'));

r.route('/etherscan/token/:address_token')
.get(require('./etherscan/token'));

r.route('/hotlist')
.get(require('./hot/list'))

r.route('/hotlist/:network')
.get(require('./hot/list_network'));

r.route('/hot')
.post(limiter, require('./hot'));

r.route('/candles/:defi/:tokena/:tokenb')
.get(require('./apollo/candles'));

r.route('/search/:defi/:search')
.get(require('./apollo/search'));


/*
* ETHERSCAN
*/


/*
* VOTES
*/

r.route('/votes')
.post(require('./votes'));

r.route('/votes/:pair')
.get(require('./votes/pair'));

/*
* VOTES
*/




/*
* SYMBOL
*/

r.route('/symbol')
.post(require('./symbol'));

/*
* SYMBOL
*/


r.route('/launchpad/transaction/create')
.post(require('./launchpad/transaction_create'));

r.route('/launchpad/transaction/:token')
.get(require('./launchpad/transaction_get'));


/*
* GENERATE CODE QR
*/

r.route('/qr')
.post(require('./qr'));

/*
* GENERATE CODE QR
*/

r.route('/board/get/post')
.get(require('./board/list'));

r.route('/board/get/:hashtag/post')
.get(require('./board/list_hastag'));

r.route('/board/id/:id/post')
.get(require('./board/list_id'));

r.route('/board/comments/:id/post')
.get(require('./board/list_comments'));

r.route('/board/save/post')
.post(require('./board'));


r.route('/information/:network/:pair/pool')
.get(require('./apollo/pool'));

r.route('/trades/:network/:basetoken/transactions')
.get(require('./apollo/trades'));


r.route('/board/new/comment/save')
.post(require('./board/comment_save'));



module.exports = r;
