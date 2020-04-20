let express = require('express'),
multer = require('multer'),
mongoose = require('mongoose'),
uuidv4 = require('uuid/v4'),
router = express.Router();
 
// Document model
let Document = require('../models/document-model');
 
//const DIR = '../public/images';
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images");
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}_${req.body.id}_${+new Date()}.jpg`);
    }
  });
 
var upload = multer({
    storage
});

router.get('/download', function (req, res, next) {
    var filePath = "./public/images"; // Or format the path using the `id` rest param
    var fileName = "purdue.jpg"; // file name 
    //res.download(filePath, fileName);  
    res.download("./public/images/purdue.jpg");
});


router.post('/document-upload', upload.single('image'), (req, res, next) => {
    console.log(req.body);
    //console.log(req.file);
    // const url = req.protocol + '://' + req.get('host')
    // const document = new Document({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: req.body.name,
    //     image: req.file
    // });
    // res.json(document);
})
 
module.exports = router;