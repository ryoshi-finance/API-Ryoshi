require('../../../../models/CommentsModel');
import mongoose from 'mongoose';
const CommentModel = mongoose.model('CommentsModel');

module.exports = (req, res, next) => {

  const { user_address, message, post_id } = req.body;

  let post = new CommentModel({
    user_address: user_address,
    message: message,
    post_id: post_id
  });

  post.save((e, d) => {
    if(e){
      return res.json({status: 'fail', message: 'Post error save in database'});
    } else {
      res.json({status: 'done', message: 'Post save correct in database', data: d});
    }
  });

}
