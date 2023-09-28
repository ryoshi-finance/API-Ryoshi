require('../../../../models/LaunchTransaction');


import mongoose from 'mongoose';
import axios from "axios";
const LaunchpadModel = mongoose.model('Launchpad');

module.exports = (req, res, next) => {

  const { address, transaction_id, transaction_type, amount_mdex, amount_bnb, token_address } = req.body;

  let saveTrx = new LaunchpadModel({
      address: address,
      transaction_id: transaction_id,
      transaction_type: transaction_type,
      amount_mdex: amount_mdex,
      amount_bnb: amount_bnb,
      token_address: token_address
  });

  saveTrx.save(() => {
    res.json({status: true})
  });

}
