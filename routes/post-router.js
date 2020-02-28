const express = require('express');
const PostCtrl = require('../controllers/post-ctrl');

const router = express.Router();

router.post('/createpost', PostCtrl.createPost);
router.put('/updatepost', PostCtrl.updatePost);
// router.delete('/movie/:id', MovieCtrl.deleteMovie)
// router.get('/movie/:id', MovieCtrl.getMovieById)
router.get('/getposts', PostCtrl.getPosts);

module.exports = router;