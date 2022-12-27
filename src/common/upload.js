require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const wasabiEndpoint = new AWS.Endpoint('https://s3.ap-southeast-1.wasabisys.com');


const s3Config = new AWS.S3({
  endpoint: wasabiEndpoint,
  accessKeyId: process.env.AWS_IAM_USER_KEY,
  secretAccessKey: process.env.AWS_IAM_USER_SECRET,
  Bucket: process.env.AWS_BUCKET_NAME
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}


// this is just to test locally if multer is working fine.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'k');
  },
  filename: (req, file, cb) => {

    cb(null, `image-${Date.now()}` + path.extname(file.originalname))
    //path.extname get the uploaded file extension
  }
})

const multerS3Config = multerS3({
  s3: s3Config,
  bucket: process.env.AWS_BUCKET_NAME,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    console.log(file)
    cb(null, `image-${Date.now()}` + path.extname(file.originalname))
  }
});

const upload = multer({

  storage: multerS3Config,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
  }
})


module.exports.getImage = (key)=>{
  s3Config.getObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: key }, function(err, data)
  {
    if (!err)
      console.log(data.Body.toString());
  });
}


exports.profileImage = upload;