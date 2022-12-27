const express = require('express');
const controller = require('./controller/index');
const { ERROR_SERVER } = require('../../const');
const { profileImage } = require('../common/upload');
const router = express.Router();

router.post('/upload',
  profileImage.single('icon'), controller.uploadSingleImage);

//  //route to upload multiple image
router.post('/upload/multi', profileImage.array('icon', 12), controller.uploadMultipleImage);

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await controller.getSingleImage(id);
  if (result) return res.json(result);
  return res.status(400).json({ result: ERROR_SERVER });
});
module.exports = router;