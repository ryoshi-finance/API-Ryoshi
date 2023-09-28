require('../../../../models/PostModel');
import mongoose from 'mongoose';
const PostModel = mongoose.model('PostModel');

module.exports = (req, res, next) => {

  const { hashtag } = req.params;


  PostModel.find({ message: { $regex: '#'+hashtag, $options: "i" } }).sort({createdAt: -1}).
  then(docs => {
    res.json({status: 'done', data: docs});
  });

}
