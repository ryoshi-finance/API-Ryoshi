
import mongoose from 'mongoose';
import axios from "axios";
import HotModel from '../../../../models/HotModel';
module.exports = (req, res, next) => {

  const { pair, defi, name, network } = req.body;

  HotModel.find({pair: pair}, (er, doc) => {
      if(doc.length <= 0){
        let nw = new HotModel({
              pair: pair,
              defi: defi,
              name: name,
              network: network,
              data: 1
        });
        nw.save(() => {
           res.json({status: true, data: nw})
        });

      } else {

        HotModel.update({ pair: pair }, { data: Number(doc[0].data) + 1 }, function(){
          res.json({status: true, data: doc});
        });

      }

    });

}
