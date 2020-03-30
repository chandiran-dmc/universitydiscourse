const express = require('express');
const PostCtrl = require('../controllers/post-ctrl');
const GradeCtrl = require('../controllers/grade-ctrl');
const CurveCtrl = require('../controllers/curve-ctrl');
const CourseCtrl = require('../controllers/course-ctrl');

const router = express.Router();

router.post('/createpost', PostCtrl.createPost);
router.post('/creategrade', GradeCtrl.createGrade);
router.post('/createcurve', CurveCtrl.createCurve);
router.post('/createcourse', CourseCtrl.createCourse);
router.put('/updatepost', PostCtrl.updatePost);
router.delete('/removeallposts', PostCtrl.removeAllPosts);
router.get('/getPostById', PostCtrl.getPostById)
router.get('/getposts', PostCtrl.getPosts);
router.get('/getcourses', CourseCtrl.getCourses);
router.get('/getgrades', GradeCtrl.getGrades);
router.get('/getcurves', CurveCtrl.getCurves);

module.exports = router;