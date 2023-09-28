require('../../../../models/TokensModels');

import mongoose from 'mongoose';
const CoinMarketCap = require('coinmarketcap-api');
const TokensModels = mongoose.model('TokensModels');

module.exports = (req, res, next) => {

    const { address } = req.params;
    const apiKey = process.env.coinmarketcap;
    const client = new CoinMarketCap(apiKey);


    TokensModels.find({address: address}).then((data) => {

        if(data.length > 0) {

            res.status(200).json({status:'done', data: data});

        } else {
            client.getMetadata({address: address}).then((obj) => {
                if(obj.data){

                    let idCMC = Object.keys(obj.data)[0];
                    let info = obj.data[idCMC];

                    var address_private = address;

                    let token = new TokensModels({
                        data: info,
                        address: address_private
                    });

                    token.save(() => {
                        res.json({status:'done', data: token});
                    });
                } else {
                  res.json({status:'fail', data: null});
                }

            }).catch(console.error);

        }

        //
    });

}
