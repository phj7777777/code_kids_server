const { error, info } = require('log');
const db = require('../../../services/database');


module.exports.createService = async (service) => {

  const currentTime = new Date();
  const {
    name,
    description,
    lowest_price,
    currency,
  } = service;
  const { rows } = await db.query(
    'INSERT INTO services (name, description, lowest_price, currency,last_update_time, created_time) VALUES ($1, $2, $3, $4,$5, $5)',
    [name, description, lowest_price, currency, currentTime],
  );

  if (rows) {
    return { status: '200', result: 'ok', message: rows };
  }

};

module.exports.getService = async (id) => {
  const response = await db.query(
    'SELECT * FROM services WHERE id = $1 LIMIT 1',
    [id],
  );

  if (response?.rows) {
    return { status: '200', result: 'ok', message: response.rows[0] };
  }
};

module.exports.updateService = async (id, service) => {
  const currentTime = new Date();
  const {
    name,
    description,
    lowest_price,
    cover_image,
    images,
    currency,
    company_id,
  } = service;

  const response = await db.query(
    'UPDATE services SET name = COALESCE($1,name), description = COALESCE($2,description), lowest_price= COALESCE($3,lowest_price),cover_image =COALESCE($4,cover_image), images = array_append(images, $5)  currency= COALESCE($6,currency), company_id = COALESCE($7,company_id), last_update_time = $8  WHERE id = $9',
    [name, description, lowest_price, cover_image, images, currency, company_id, currentTime, id],
  );

  if (response) {
    return { status: '200', result: 'ok', message: 'Update successfully' };
  }
};


module.exports.deleteService = async (id) => {
  const response = await db.query(
    'DELETE FROM services WHERE id = $1',
    [parseInt(id)],
  );
  if (response) {
    return { status: '200', result: 'ok', message: 'Delete successfully' };
  }
};




