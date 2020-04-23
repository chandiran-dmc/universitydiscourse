const express = require('express');
const CommentCtrl = require('../controllers/comment-ctrl');

const router = express.Router();
 
router.post('/comment', CommentCtrl.createComment);
router.post('/getcomments', CommentCtrl.getComments);
router.post('/updatecomment', CommentCtrl.updateComment);
router.post('/deletecomment', CommentCtrl.deleteComment);
router.post('/like', CommentCtrl.likeComment);
router.post('/upvote', CommentCtrl.upvoteComment);
router.post('/downvote', CommentCtrl.downvoteComment);


module.exports = router;