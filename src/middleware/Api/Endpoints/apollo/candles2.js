import { request, gql } from 'graphql-request'
var list = [];

const defi_list = {
  'sushi': 'https://api.thegraph.com/subgraphs/name/edinsoncs/sushicandles',
  'shiba': 'https://api.thegraph.com/subgraphs/name/edinsoncs/sswap',
}

module.exports = (req, res, next) => {


  const {defi, pair} = req.params;

  const query = gql`
    {
      candles(first: 10,  where: {pairId: "${pair}", period: 3600}) {
        id
        open
        low
        time
        close
        high
        token0TotalAmount
        token1TotalAmount
        period
      }

    }
  `

  const result = request(defi_list[defi], query);
  result.then(async (data) => {

    let formatOrder = await timeSort(data.candles);

    var result = data.candles.filter(function (a) {
        return !this[a.time] && (this[a.time] = true);
    }, Object.create(null));

    res.json({status: true, data: result});

  });


  function timeSort(arr){
    arr.sort(function(x, y){
        return x.time - y.time;
    })
  }

}
