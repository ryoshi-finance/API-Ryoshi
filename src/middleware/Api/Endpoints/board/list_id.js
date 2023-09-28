require('../../../../models/PostModel');
import mongoose from 'mongoose';
const PostModel = mongoose.model('PostModel');

module.exports = (req, res, next) => {

  const { id } = req.params;

  PostModel.findById({_id: id}, (e, docs) => {
    if(e){
      res.json({status: 'fail'});
    } else{
      res.json({status: 'done', data: docs});
    }
  })

}
