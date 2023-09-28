import { request, gql } from 'graphql-request'
var list = [];

const defi_list = {
  'uniswap': 'https://api.thegraph.com/subgraphs/name/ianlapham/uniswapv2',
  'uniswapv3': 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  'sushi': 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
  'shiba': 'https://api.thegraph.com/subgraphs/name/shibaswaparmy/exchange',
}

module.exports = (req, res, next) => {


  var {defi, search} = req.params;


  const querys = {
    'uniswap': gql`
        query tokens($value: String, $id: String) {
               asSymbol: tokens(first:25, where: { symbol_contains: $value }, orderBy: totalLiquidity, orderDirection: desc) {
                 id
                 symbol
                 name
                 totalLiquidity
                 pairBase {
                   id
                 }
               }
               asName: tokens(first:25, where: { name_contains: $value }, orderBy: totalLiquidity, orderDirection: desc) {
                 id
                 symbol
                 name
                 totalLiquidity
                 pairBase {
                   id
                 }
               }
               asAddress: tokens(first:25, where: { id: $id }, orderBy: totalLiquidity, orderDirection: desc) {
                 id
                 symbol
                 name
                 totalLiquidity
                 pairBase {
                   id
                 }
               }
         }
    `,
    'sushi': gql`
        query tokens($value: String, $id: String) {
               asSymbol: tokens(first:25, where: { symbol_contains: $value }, orderBy: totalSupply, orderDirection: desc) {
                 id
                 symbol
                 name
                 totalSupply
                 basePairs {
                   id
                 }
               }
               asName: tokens(first:25, where: { name_contains: $value }, orderBy: totalSupply, orderDirection: desc) {
                 id
                 symbol
                 name
                 totalSupply
                 basePairs {
                   id
                 }
               }
               asAddress: tokens(first:25, where: { id: $id }, orderBy: totalSupply, orderDirection: desc) {
                 id
                 symbol
                 name
                 totalSupply
                 basePairs {
                   id
                 }
               }
         }
    `,
    'shiba': gql`
        query tokens($value: String, $id: String) {
               asSymbol: tokens(first:25, where: { symbol_contains: $value }, orderBy: totalSupply, orderDirection: desc) {
                 id
                 symbol
                 name
                 totalSupply
                 basePairs {
                   id
                 }
               }
               asName: tokens(first:25, where: { name_contains: $value }, orderBy: totalSupply, orderDirection: desc) {
                 id
                 symbol
                 name
                 totalSupply
                 basePairs {
                   id
                 }
               }
               asAddress: tokens(first:25, where: { id: $id }, orderBy: totalSupply, orderDirection: desc) {
                 id
                 symbol
                 name
                 totalSupply
                 basePairs {
                   id
                 }
               }
         }
    `,
    'uniswapv3': gql`
        query tokens($value: String, $id: String) {
               asSymbol: tokens(first:25, where: { symbol_contains: $value }, orderBy: derivedETH, orderDirection: desc) {
                 id
                 symbol
                 name
                 derivedETH
                 whitelistPools(where: {liquidity_gt: "1"}) {
                  id
                 }
               }
               asName: tokens(first:25, where: { name_contains: $value }, orderBy: derivedETH, orderDirection: desc) {
                 id
                 symbol
                 name
                 derivedETH
                 whitelistPools(where: {liquidity_gt: "1"}) {
                  id
                 }
               }
               asAddress: tokens(first:25, where: { id: $id }, orderBy: derivedETH, orderDirection: desc) {
                 id
                 symbol
                 name
                 derivedETH
                 whitelistPools(where: {liquidity_gt: "1"}) {
                  id
                 }
               }
         }
    `

  }


  let variables = { value: search ? search.toUpperCase() : '', id: search};

  const result = request(defi_list[defi], querys[defi], variables);

  result.then(async (data) => {
    res.json({status: true, data: data});
  });


}
