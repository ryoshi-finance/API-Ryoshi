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
    const { network, basetoken } = req.params;

    const query = `
      query{ethereum(network: ${network}) {
        dexTrades(
          options: {limit: 50, desc: "block.timestamp.time", offset: 0}
          exchangeName: {is: "Pancake v2"}
          baseCurrency: {is: "${basetoken}"}
        ) {
        transaction {
          hash
          txFrom {
            address
          }
        }
        smartContract {
          address {
            address
          }
          contractType
          currency {
            name
            symbol
          }
        }
        tradeIndex
        date {
          date(format: "%Y-%m-%d %H:%M:%S")
        }
        block {
          height
          timestamp {
              time(format: "%FT%TZ")
          }
        }
        buyAmount
        buyAmountInUsd: buyAmount(in: USD)
        buyCurrency {
          symbol
          address
        }
        sellAmount
        sellAmountInUsd: sellAmount(in: USD)
        sellCurrency {
          symbol
          address
        }
        sellAmountInUsd: sellAmount(in: USD)
        tradeAmount(in: USD)
        side
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
            res.json({ status: true, data: data.data.ethereum.dexTrades });
        }
    }
};
