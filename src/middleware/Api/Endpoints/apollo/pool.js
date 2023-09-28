import { request, gql } from "graphql-request";
const defi_list = {
    graph: "https://graphql.bitquery.io/",
};

const api_keys = [
    "BQYFAkf9wGadxFZWO4S4H5uENwWFbQVX",
    "BQY2zpLhV0KYfwTYYkF6yyCXsL0con64",
    "BQYo1dqWvKjMCBCVbP3CNaFecqKyRNPB",
    "BQYw2iBRWZ99CzQUoIW7KBPXifgXRhNg",
    "BQY2RTuppU2LcqjSalbStDRNpJMGa5Ez",
];

function get_random(list) {
    return list[Math.floor(Math.random() * list.length)];
}

module.exports = async (req, res, next) => {
    const { network, pair } = req.params;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();



    var actuality = yyyy + '-' + mm + '-' + dd;
    var date = new Date(actuality);
    var yesterday = new Date(date.getTime() - 24*60*60*1000);

    var d1 = String(yesterday.getDate()).padStart(2, '0');
    var m1 = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
    var y1 = yesterday.getFullYear();

    var before = y1 + '-' + m1 + '-' + d1;

    const query = `
      query{ethereum(network: ${network}) {

        info: dexTrades(
          options: {desc: "count"}
          smartContractAddress: {is: "${pair}"}
          date: {since: "${before}", till: "${actuality}"}
        ) {
          count
          tradeAmount(in: USD)
        }

          dexTrades(
            smartContractAddress: {is: "${pair}"}
            options: {desc: ["block.height", "transaction.index"], limit: 1}
          ) {
            date {
              date
            }
            exchange {
              fullName
              name
              fullNameWithId
            }
            baseCurrency {
              symbol
              name
              decimals
              tokenType
              address
            }
            quoteCurrency {
              symbol
              name
              decimals
              address
            }
            transaction {
              index
            }
            block {
              height
              timestamp {
                time(format: "%Y-%m-%d %H:%M:%S")
              }
            }
            trades: count
            tradeAmount(in: USD)
            sellAmount(in: USD)
            buyAmount(in: USD)
            tradeIndex
            volume: quoteAmount
            maximum_price: quotePrice(calculate: maximum)
            minimum_price: quotePrice(calculate: minimum)
            open_price: minimum(of: block, get: quote_price)
            close_price: maximum(of: block, get: quote_price)
            baseAmount
            side
            quotePrice
          }
          address(address: {is: "${pair}"}) {
            balances {
              currency {
                symbol
              }
              value
            }
          }
          smartContractEvents(
            smartContractAddress: {is: "${pair}"}
          ) {
            count(uniq: txs)
          }

        }
      }
  `;

    const url = defi_list.graph;
    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": get_random(api_keys),
        },
        body: JSON.stringify({
            query,
        }),
    };

    const lt = await fetch(url, opts);
    const data = await lt.json();

    console.log(data);

    if (data) {
        if (data.data.ethereum.dexTrades) {
            res.json({
              status: true,
              data: data.data.ethereum.dexTrades,
              pool:  data.data.ethereum.address,
              smart: data.data.ethereum.smartContractEvents,
              info: data.data.ethereum.info
            });
        }
    }
};
