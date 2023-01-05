const status = require('../src/health/routes');
const message = require('../src/messenger/routes');
const company = require('../src/companies/routes');
const booking = require('../src/bookings/routes');
const customer = require('../src/customers/routes');
const staff = require('../src/staffs/routes');
const package = require('../src/packages/routes');
const image = require('../src/images/routes');
const service = require('../src/services/routes');
const { API_PREFIX } = require('../const');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const validateAuth = require('../middlewares/validateAuth');
const getData = require('../middlewares/getData');
const express = require('express');


module.exports = (app) => {


  //app.use(`${API_PREFIX}//users`, validateAuth.checkIfAuthenticated, getData.getGeoip, users);

  app.use(express.static('images'));
  app.use(`${API_PREFIX}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(`${API_PREFIX}/status`, validateAuth.checkIfAuthenticated, getData.getGeoip, status);
  app.use(`${API_PREFIX}/image`, validateAuth.checkIfAuthenticated, getData.getGeoip, image);
  app.use(`${API_PREFIX}/message`, validateAuth.checkIfAuthenticated, getData.getGeoip, message);
  app.use(`${API_PREFIX}/company`, validateAuth.checkIfAuthenticated, getData.getGeoip, company);
  app.use(`${API_PREFIX}/booking`, validateAuth.checkIfAuthenticated, getData.getGeoip, booking);
  app.use(`${API_PREFIX}/customer`, validateAuth.checkIfAuthenticated, getData.getGeoip, customer);
  app.use(`${API_PREFIX}/staff`, validateAuth.checkIfAuthenticated, getData.getGeoip, staff);
  app.use(`${API_PREFIX}/package`, validateAuth.checkIfAuthenticated, getData.getGeoip, package);
  app.use(`${API_PREFIX}/service`, validateAuth.checkIfAuthenticated, getData.getGeoip, service);
  app.use('*', (req, res) => {
    res.status(404).json({ status: 404, result: 'error', message: 'Not Found' });
  });
};
