const { error, info } = require('log');
const db = require('../../../services/database');


module.exports.createCompany = async (company) => {

  const currentTime = new Date();
  const {
    name,
    description,
    email,
    booking_policy,
    address,
    country,
    phone_number,
    country_code,
    profile_image,
    url,
  } = company;
  const { rows } = await db.query(
    'INSERT INTO companies (name, description, email, booking_policy, address, country, phone_number, country_code, profile_image, url, last_update_time, created_time) VALUES ($1, $2, $3, $4,$5, $6, $7, $8,$9, $10, $11, $11)',
    [name, description, email, booking_policy, address, country, phone_number, country_code, profile_image, url, currentTime],
  );

  if (rows) {
    return { status: '200', result: 'ok', message: rows };
  }

};

module.exports.getCompany = async (id) => {
  const response = await db.query(
    'SELECT * FROM companies WHERE id = $1 LIMIT 1',
    [id],
  );

  if (response?.rows) {
    return { status: '200', result: 'ok', message: response.rows[0] };
  }
};


module.exports.updateCompany = async (id, company) => {

  const currentTime = new Date();
  const {
    name,
    description,
    email,
    booking_policy,
    address,
    country,
    phone_number,
    country_code,
    profile_image,
    url,
  } = company;
  const response = await db.query(
    'UPDATE companies SET name = COALESCE($1,name), description = COALESCE($2,description), email= COALESCE($3,email), booking_policy= COALESCE($4,booking_policy), address= COALESCE($5,address), country= COALESCE($6,country), phone_number= COALESCE($7,phone_number), country_code= COALESCE($8,country_code), profile_image= COALESCE($9,profile_image), url= COALESCE($10,url), last_update_time= $11, WHERE id = $12',
    [name, description, email, booking_policy, address, country, phone_number, country_code, profile_image, url,currentTime, id],
  );

  if (response) {
    return { status: '200', result: 'ok', message: 'Update successfully' };
  }
};


module.exports.deleteCompany = async (id) => {
  const productId = parseInt(id);
  const response = await db.query(
    'DELETE FROM companies WHERE id = $1',
    [productId],
  );
  if (response) {
    return { status: '200', result: 'ok', message: 'Delete successfully' };
  }
};




