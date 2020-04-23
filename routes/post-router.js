const express = require('express');
const PostCtrl = require('../controllers/post-ctrl');
const GradeCtrl = require('../controllers/grade-ctrl');
const CurveCtrl = require('../controllers/curve-ctrl');
const CourseCtrl = require('../controllers/course-ctrl');
const RatingsCtrl = require('../controllers/rating-ctrl');

const router = express.Router();

router.post('/createpost', PostCtrl.createPost);
router.post('/creategrade', GradeCtrl.createGrade);
router.post('/createcurve', CurveCtrl.createCurve);
router.post('/createcourse', CourseCtrl.createCourse);
router.post('/createrating', RatingsCtrl.createRating);
router.put('/updatepost', PostCtrl.updatePost);
router.post('/report', PostCtrl.reportPost);
router.post('/like', PostCtrl.likePost);

router.post('/upvote', PostCtrl.upvotePost);

router.post('/downvote', PostCtrl.downvotePost);

router.delete('/removeallposts', PostCtrl.removeAllPosts);
router.get('/getPostById', PostCtrl.getPostById)
router.get('/getposts', PostCtrl.getPosts);

router.get('/getcourses', CourseCtrl.getCourses);
router.get('/getgrades', GradeCtrl.getGrades);
router.get('/getcurves', CurveCtrl.getCurves);
router.get('/getratings', RatingsCtrl.getRatings);

module.exports = router;