const { API_PREFIX, WHATSAPP_BEARER_TOKEN } = require('../../const');
const express = require('express');
const httpService = require('../../services/httpService');

const router = express.Router();

router.post(`${API_PREFIX}/send`,
  async (req, res) => {
    const receiver = '6587824529';
    const message = 'hello_world';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${WHATSAPP_BEARER_TOKEN}`
    }

    await httpService.postHttp('https://graph.facebook.com/v13.0/108878718617091/messages', res,
      {
        'messaging_product': 'whatsapp',
        'to': receiver,
        'type': 'template',
        'template': { 'name': message, 'language': { 'code': 'en_US' } },
      }, headers);
  },
);

module.exports = router;
