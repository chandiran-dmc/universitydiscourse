let express = require('express'),
multer = require('multer'),
mongoose = require('mongoose'),
uuidv4 = require('uuid/v4'),
router = express.Router();
var path = require('path');
// Document model
let Document = require('../models/document-model');
 
//const DIR = '../public/images';
let fileNameUnique = Math.random()*100000;
 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./src/components/CoursePage/Documents");
    },
    filename: (req, file, cb) => {
      cb(null, `${fileNameUnique}_${file.originalname}`);
    }
  });
 
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if(ext !== '.pdf') {
          return callback(new Error('Only pdfs are allowed'))
      }
      callback(null, true)
  },
});

router.get('/download', function (req, res, next) {
    var fileName = req._parsedUrl.query.replace("%20", " ");
    console.log(fileName);
    res.download("./src/components/CoursePage/Documents/" + fileName);
});

router.post('/document-upload', upload.single('doc'), (req, res, next) => {
    console.log(req.file.originalname);
    const document = new Document({
        _id: new mongoose.Types.ObjectId(),
        name: fileNameUnique+"_"+req.file.originalname,
    });
    document.save()
})

router.post('/getDocuments', function (req, res, next) {

  Document.find({}, (err, documents) => {
      // error handling
      if (err) {
          return res.status(400).json({ success: false, error: err });
      }
      // result checking
      if (!documents.length) {
          return res
              .status(402)
              .json({ success: false, error: `Documents not found` });
      }
      // return posts
      return res.status(200).json({ success: true, data: documents });

  }).catch(err => console.log(err));
});
 
module.exports = router;