require('../../../../models/PostModel');
import mongoose from 'mongoose';
const PostModel = mongoose.model('PostModel');

module.exports = (req, res, next) => {

  const { user,  message, image, gif, likes } = req.body;

  let post = new PostModel({
    user_address: user,
    message: message,
    image: image,
    gif: gif
  });

  post.save((e, d) => {
    console.log(e);
    if(e){
      return res.json({status: 'fail', message: 'Post error save in database'});
    } else {
      res.json({status: 'done', message: 'Post save correct in database', data: d});
    }

  });

}
