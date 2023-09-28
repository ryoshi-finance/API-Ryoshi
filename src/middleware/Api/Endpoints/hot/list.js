
import mongoose from 'mongoose';
import axios from "axios";
import HotModel from '../../../../models/HotModel';


module.exports = (req, res, next) => {

  const { pair, defi, name } = req.body;

  HotModel.find({}, {}, { limit: 10 }, (err, doc) => {

    if(doc.length > 0) {
      let data = doc.sort((a,b)=> (a.data > b.data ? 1 : -1))
      res.json({status: true, data: data.reverse()});
    }


  });



}
