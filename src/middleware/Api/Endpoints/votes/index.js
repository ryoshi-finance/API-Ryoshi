
import mongoose from 'mongoose';
import axios from "axios";
import VotesModel from '../../../../models/VotesModel';
module.exports = (req, res, next) => {
  const {account, pair, type} = req.body;

  VotesModel.find({address: account, pair: pair}, (er, doc) => {


      if(doc.length <= 0){

        let nw = new VotesModel({
              address: account,
              pair: pair,
              type: type
        })

        nw.save(() => {
           res.json({status: true, data: nw})
        });

      } else {
        res.json({status: false});
      }



});

}
