const express = require('express')

const PostCtrl = require('../controllers/post-ctrl')

const router = express.Router()

router.post('/post', PostCtrl.createPost)
// router.put('/movie/:id', MovieCtrl.updateMovie)
// router.delete('/movie/:id', MovieCtrl.deleteMovie)
// router.get('/movie/:id', MovieCtrl.getMovieById)
// router.get('/movies', MovieCtrl.getMovies)

module.exports = router