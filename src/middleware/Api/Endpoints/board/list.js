require('../../../../models/PostModel');
require('../../../../models/CommentsModel');

import mongoose from 'mongoose';
const PostModel = mongoose.model('PostModel');
const CommentModel = mongoose.model('CommentsModel');

module.exports = async (req, res, next) => {

  var list = [];

  await PostModel.find({}).sort({createdAt: -1}).exec(function(e,docs){
    if(e){
      res.json({status: 'fail'});
    } else{

      docs.map((e, i, a) => {

        var arr = {};
        arr['_id'] = e._id;
        arr['user_address'] = e.user_address;
        arr['message'] = e.message;
        arr['image'] = e.image;
        arr['createdAt'] = e.createdAt;
        arr['comments'] = 0;

        CommentModel.find({post_id: e._id}).then((data) => {
            arr['comments'] = data.length;
        });
        list.push(arr);
      });
      setTimeout(() => {
        res.json({status: 'done', data: list});
      }, 1000);
    }
  })

}
