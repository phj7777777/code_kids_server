const status = require('../src/health/routes');
const message = require('../src/messenger/routes');
const company = require('../src/companies/routes');
const { API_PREFIX } = require('../const');
// const users = require('../src/users/routes');
// const validateAuth = require('../middlewares/validateAuth');
// const getData = require('../middlewares/getData');

module.exports = (app) => {
  app.use(`${API_PREFIX}/status`, status);
  app.use(`${API_PREFIX}/message`, message);
  app.use(`${API_PREFIX}/company`, company);
  // app.use('/users', users);
  // app.use('/users', validateAuth.checkIfAuthenticated, getData.getGeoip, users);
  app.use('*', (req, res) => {
    res.status(404).json({ status: 404, result: 'error', message: 'Not Found' });
  });
};
