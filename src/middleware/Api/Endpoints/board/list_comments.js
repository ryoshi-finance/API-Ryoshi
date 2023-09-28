require('../../../../models/CommentsModel');
import mongoose from 'mongoose';
const CommentModel = mongoose.model('CommentsModel');

module.exports = (req, res, next) => {

  const { id } = req.params;
  CommentModel.find({post_id: id}).sort({createdAt: -1}).exec(function(e,docs){
    if(e){
      res.json({status: 'fail'});
    } else{
      res.json({status: 'done', data: docs});
    }
  })

}
