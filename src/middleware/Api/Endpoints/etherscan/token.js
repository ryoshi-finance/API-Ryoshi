
import mongoose from 'mongoose';
import axios from "axios";
import TokensErc20 from '../../../../models/TokensErc20Model';
module.exports = (req, res, next) => {

  const {address_token} = req.params;


    TokensErc20.find({address: address_token.toLowerCase()}, (er, doc) => {


        //if(doc.length <= 0){


              let ApiTokens = axios.get("https://api.ethplorer.io/getAddressInfo/"+address_token+"?apiKey=EK-oaWYJ-wHzjyWs-53J7Y");

              ApiTokens.then((data) => {

                  if(data.data){

                      let nw = new TokensErc20({
                            address: data.data.address,
                            name: data.data.tokenInfo.name,
                            symbol: data.data.tokenInfo.symbol,
                            totalSupply: data.data.tokenInfo.totalSupply,
                            holdersCount: data.data.tokenInfo.holdersCount,
                            decimals: data.data.tokenInfo.decimals,
                            website: data.data.tokenInfo.website,
                            facebook: data.data.tokenInfo.facebook,
                            telegram: data.data.tokenInfo.telegram,
                            twitter: data.data.tokenInfo.twitter,
                            image: data.data.tokenInfo.image,
                            coingecko: data.data.tokenInfo.coingecko,
                            information: (data.data.ETH) ? data.data.ETH.price : null,
                            createdAt: (data.data.contractInfo) ? data.data.contractInfo.timestamp : null
                        })

                      nw.save(() => {
                         res.json({status: true, data: nw})
                      });

                  } else {

                      res.json({status: false});
                  }

              });

        //} else {
          //res.json({status: true, data: (doc.length > 0) ? doc.reverse()[0] : doc[0] });
        //}



  });


}
