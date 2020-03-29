const express = require('express');
const PostCtrl = require('../controllers/post-ctrl');

const router = express.Router();

router.post('/createpost', PostCtrl.createPost);
router.put('/updatepost', PostCtrl.updatePost);
router.post('/report', PostCtrl.reportPost);
router.post('/like', PostCtrl.likePost);
router.post('/upvote', PostCtrl.upvotePost);
router.post('/downvote', PostCtrl.downvotePost);
router.delete('/removeallposts', PostCtrl.removeAllPosts);
// router.get('/movie/:id', MovieCtrl.getMovieById)
router.get('/getposts', PostCtrl.getPosts);

module.exports = router;