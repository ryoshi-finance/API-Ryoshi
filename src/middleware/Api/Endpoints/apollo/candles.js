import { request, gql } from 'graphql-request'
var list = [];

var today = new Date();
var date = today.toISOString().split('T')[0];
//'BQYgcNUGIECmZY9K9Zp8CM3d6DkES7M7', apikey=> edinsoncode@gmail.com
//'BQYo1dqWvKjMCBCVbP3CNaFecqKyRNPB', apikey=> eddy@trcrecruitme.com
const api_keys = ['BQYFAkf9wGadxFZWO4S4H5uENwWFbQVX','BQY2zpLhV0KYfwTYYkF6yyCXsL0con64', 'BQYo1dqWvKjMCBCVbP3CNaFecqKyRNPB', 'BQYw2iBRWZ99CzQUoIW7KBPXifgXRhNg', 'BQY2RTuppU2LcqjSalbStDRNpJMGa5Ez']

const defi_list = {
  'graph': 'https://graphql.bitquery.io/',
  'exchange': {
    'uniswap': '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
    'uniswapv3': '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    'sushi': '0xc0aee478e3658e2610c5f7a4a2e1777ce9e4f2ac',
    'shiba': '0x115934131916C8b277DD010Ee02de363c09d037c',
    
    'pancakeswap': '0xca143ce32fe78f1f7019d7d551a6402fc5350c73',
    'biswap': '0x858E3312ed3A876947EA49d572A7C42DE08af7EE',
    'apeswap': '0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6',
    'babyswap': '0x86407bEa2078ea5f5EB5A52B2caA963bC1F889Da',
    'quickswap': '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
    'kyberswap': '0x5f1fe642060b5b9658c15721ea22e982643c095c'
  }
}

function get_random(list) {
  return list[Math.floor((Math.random()*list.length))];
}


module.exports = async (req, res, next) => {

  const {defi, tokena, tokenb} = req.params;
  var typeNetwork;

  if(Number(req.query.frame) < 60) {
    var frame = Number(req.query.frame);
    var type = 'minute'
  }
  else {
    var frame = Math.floor(Number(req.query.frame) / 60);
    var type = 'hour'
  }


  if(defi == 'pancakeswap' ||
    defi == 'biswap' ||
    defi == 'apeswap' ||
    defi == 'babyswap') {
    typeNetwork = 'bsc';
  }

  else if(
    defi == 'quickswap' ||
    defi == 'kyberswap'){
    typeNetwork = 'matic';
  }

  else {
    typeNetwork = 'ethereum';
  }


  const query = `
      query{ethereum(network: ${typeNetwork}) {
          dexTrades(
            options: {asc: "timeInterval.${type}"}
            date: {since: "2021-03-07T18:20:21.000Z", till: "${date}"}
            exchangeAddress: {is: "${defi_list.exchange[defi]}"}
            baseCurrency: {is: "${tokena}"}
            quoteCurrency: {is: "${tokenb}"}
            tradeAmountUsd: {gt: 20}
          ) {
            timeInterval {
              ${type}(format: "%FT%TZ", count: ${frame})
            }
            baseAmount
            volume: quoteAmount
            high: quotePrice(calculate: maximum)
            low: quotePrice(calculate: minimum)
            open: minimum(of: block, get: quote_price)
            close: maximum(of: block, get: quote_price)
            baseCurrency {
              name
            }
          }
        }
      }
  `;


  const url = defi_list.graph;
  const opts = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "X-API-KEY": get_random(api_keys)
      },
      body: JSON.stringify({
          query
      })
  };



  const lt = await fetch(url, opts);
  const data = await lt.json();

  console.log(data);

  if(data){
    if(data.data.ethereum.dexTrades){
      res.json({status: true, data: data.data.ethereum.dexTrades});
    }
  }



}
