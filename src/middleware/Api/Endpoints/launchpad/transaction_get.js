require('../../../../models/LaunchTransaction');


import mongoose from 'mongoose';
import axios from "axios";
const LaunchpadModel = mongoose.model('Launchpad');

module.exports = (req, res, next) => {

   const { token } = req.params;

    LaunchpadModel.find({token_address: token}, (e, doc) => {

        if(doc.length){
          res.json({status: true, data: doc});
        } else {
          res.json({status: false});
        }

    });


}
