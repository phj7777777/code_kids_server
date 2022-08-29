const axios = require('axios').default;
const { error, info } = require('log');

// POST HTTP request
module.exports.postHttp = async (url, res, data = {}, headers = {}) => {
  axios.post(url, data, { headers: headers })
    .then(function(response) {
      info(response);
      res.send({ result: 'ok', message: response.data });
    })
    .catch(function(err) {
      error(err);
      res.send({ result: 'error', message: err });
    });
};

// GET HTTP request
module.exports.getHttp = async (url, res, params = {}) => {
  axios.get(url, {
    params: params,
  })
    .then(function(response) {
      info(response);
      res.send({ result: 'ok', message: response.data });
    })
    .catch(function(err) {
      error(err);
      res.send({ result: 'error', message: err });
    });
};

