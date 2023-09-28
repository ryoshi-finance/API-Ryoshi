
import mongoose from 'mongoose';
import axios from "axios";
import VotesModel from '../../../../models/VotesModel';
module.exports = (req, res, next) => {

  const {pair} = req.params;

  VotesModel.find({pair: pair}, (er, doc) => {

      if(doc.length <= 0){
        res.json({status: false, data: null})
      } else {
        res.json({status: true, data: doc});
      }


    });

}
