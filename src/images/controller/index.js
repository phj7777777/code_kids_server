const client = require('../../../services/database');

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

