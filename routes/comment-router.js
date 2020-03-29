const express = require('express');
const CommentCtrl = require('../controllers/comment-ctrl');

const router = express.Router();
 
router.post('/comment', CommentCtrl.createComment);
router.post('/getcomments', CommentCtrl.getcomments);

module.exports = router;