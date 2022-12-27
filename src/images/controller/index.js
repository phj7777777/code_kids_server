const path = require('path');
const client = require('../../../services/database');
const { SUCCESS } = require('../../../const');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: 'V0rFezRWXZWDoJ2Mw83pbXZUv2kZP2nrC3VKLdDr',
  accessKeyId: 'IZ0MI4JOAK59M9U21KFD',
  region: 'ap-southeast-1',
});


s3 = new aws.S3();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('hiii');

    multerS3({
      s3: s3,
      bucket: 'test-aps',
      metadata: function(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function(req, file, cb) {
        cb(null, `image-${Date.now()}` + path.extname(file.originalname));

      },
    });
  },
});
const multerFilter = (req, file, cb) => {

  if (!file.originalname.match(/\.(png|jpg)$/)) {
    // upload only png and jpg format
    return cb(new Error('Please upload a Image'));
  }
  cb(null, true);

};
exports.upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'test-aps',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
  fileFilter: multerFilter,
});
exports.uploadSingleImage = async (req, res) => {
  await client.query(`INSERT INTO test(name, icon) VALUES ('${req.body.name}','${req.file.key}')`);
  res.status(200).json({ 'statusCode': 200, 'status': true, message: 'Image added', 'data': [] });
  //return { result: SUCCESS, message: x };
};
exports.uploadMultipleImage = async (req, res) => {

  for (let i = 0; i < req.files.length; i++) {
    await client.query(`INSERT INTO test(name, icon) VALUES ('${req.body.name}','${req.files[i].key}')`);
  }
  res.status(200).json({
    'statusCode': 200, 'status': true,
    message: 'All Image added', 'data': [],
  });
};

