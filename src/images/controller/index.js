const client = require('../../../services/database');

exports.uploadSingleImage = async (req, res) => {
  console.log(req.file);
  console.log('uploading');
  res.status(200).json({
    'statusCode': 200, 'status': true, message: 'Image added', 'data':
    req.file,

  });
};
exports.uploadMultipleImage = async (req, res) => {
  res.status(200).json({
    'statusCode': 200, 'status': true,
    message: 'All Image added', 'data': req.files,
  });
};


