const express = require('express');
const PostCtrl = require('../controllers/post-ctrl');
const GradeCtrl = require('../controllers/grade-ctrl');
const CurveCtrl = require('../controllers/curve-ctrl');

const router = express.Router();

router.post('/createpost', PostCtrl.createPost);
router.post('/creategrade', GradeCtrl.createGrade);
router.post('/createcurve', CurveCtrl.createCurve);
router.put('/updatepost', PostCtrl.updatePost);
router.delete('/removeallposts', PostCtrl.removeAllPosts);
router.get('/getposts', PostCtrl.getPosts);
router.get('/getgrades', GradeCtrl.getGrades);
router.get('/getcurves', CurveCtrl.getCurves);

module.exports = router;