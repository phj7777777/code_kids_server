const db = require('../services/database');

module.exports.createCustomerQuery = async (customer) => {

  const currentTime = new Date();
  const {
    name,
    address,
    email,
    country,
    phone_number,
    country_code,
    profile_image,
  } = customer;

  return await db.query(
    'INSERT INTO customers (name,address,email, country, phone_number, country_code,profile_image, last_update_time, created_time) VALUES ($1, $2, $3, $4,$5,$6,$7,$8, $8)',
    [name, address, email, country, phone_number, country_code, profile_image, currentTime],
  );
};


module.exports.getAllCustomerQuery = async () => {

  return await db.query('SELECT * FROM customers');

};

module.exports.getCustomerQuery = async (id) => {
  return await db.query(
    'SELECT * FROM customers WHERE cud = $1 LIMIT 1',
    [id],
  );
};

module.exports.updateCustomerQuery = async (id, customer) => {
  const currentTime = new Date();
  const {
    name,
    email,
    phone_number,
    country_code,
    profile_image,
    dob,
  } = customer;

  return await db.query(
    'UPDATE customers SET name = COALESCE($1,name),email = COALESCE($2,email),phone_number =  COALESCE($3,phone_number),country_code = COALESCE($4,country_code), profile_image = COALESCE($5,profile_image),  dob= COALESCE($6,dob),last_update_time = $7 WHERE id = $8',
    [name, email, phone_number, country_code, profile_image, dob, currentTime, id],
  );
};

module.exports.deleteCustomerQuery = async (id) => {
  return await db.query(
    'DELETE FROM customers WHERE id = $1',
    [parseInt(id)],
  );
};