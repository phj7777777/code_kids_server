const { error, info } = require('log');
const db = require('../../../services/database');


module.exports.createCustomer = async (customer) => {

  const currentTime = new Date();
  const {
    name,
    age,
    address,
    email,
    country,
    phone_number,
    country_code,
    profile_image,
  } = customer;
  const { rows } = await db.query(
    'INSERT INTO customers (name, age, address,email, country, phone_number, country_code,profile_image, last_update_time, created_time) VALUES ($1, $2, $3, $4,$5,$6,$7,$8, $9, $9)',
    [name, age, address, email, country, phone_number, country_code, profile_image, currentTime],
  );

  if (rows) {
    return { status: '200', result: 'ok', message: rows };
  }

};

module.exports.getCustomer = async (id) => {
  const response = await db.query(
    'SELECT * FROM customers WHERE id = $1 LIMIT 1',
    [id],
  );

  if (response?.rows) {
    return { status: '200', result: 'ok', message: response.rows[0] };
  }
};

module.exports.updateCustomer = async (id, customer) => {
  const currentTime = new Date();
  const {
    name,
    age,
    address,
    email,
    country,
    phone_number,
    country_code,
    profile_image,
  } = customer;

  const response = await db.query(
    'UPDATE customers SET name = COALESCE($1,name), age = COALESCE($2,age), address= COALESCE($3,address), email= COALESCE($4,email),  country= COALESCE($5,country), phone_number = COALESCE($6,phone_number), country_code= COALESCE($7,country_code), profile_image= COALESCE($8,profile_image),last_update_time = $9  WHERE id = $10',
    [name, age, address, email, country, phone_number, country_code, profile_image, currentTime, id],
  );

  if (response) {
    return { status: '200', result: 'ok', message: 'Update successfully' };
  }
};


module.exports.deleteCustomer = async (id) => {
  const response = await db.query(
    'DELETE FROM customers WHERE id = $1',
    [parseInt(id)],
  );
  if (response) {
    return { status: '200', result: 'ok', message: 'Delete successfully' };
  }
};




