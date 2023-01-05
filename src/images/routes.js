const express = require('express');
const controller = require('./controller/index');
const { ERROR_SERVER } = require('../../const');
const { profileImage } = require('../common/upload');
const router = express.Router();

router.post('/upload',
  profileImage.single('icon'), controller.uploadSingleImage);

//  //route to upload multiple image
router.post('/upload/multi', profileImage.array('icon', 12), controller.uploadMultipleImage);


module.exports = router;