const { error, info } = require('log');
const db = require('../../../services/database');


module.exports.createCustomer = async (customer) => {

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
  const { rows } = await db.query(
    'INSERT INTO customers (name,address,email, country, phone_number, country_code,profile_image, last_update_time, created_time) VALUES ($1, $2, $3, $4,$5,$6,$7,$8, $8)',
    [name,  address, email, country, phone_number, country_code, profile_image, currentTime],
  );

  if (rows) {
    return { status: '200', result: 'ok', message: rows };
  }

};

module.exports.getAllCustomer = async () => {
  const response = await db.query(
    'SELECT * FROM customers ',
  );

  console.log(response)
  if (response?.rows) {
    return { status: '200', result: 'ok', data: response.rows };
  }
};


module.exports.getCustomer = async (id) => {
  const response = await db.query(
    'SELECT * FROM customers WHERE cud = $1 LIMIT 1',
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
    email,
    phone_number,
    country_code,
    profile_image,
    dob,
  } = customer;

  try{
    const response = await db.query(
      'UPDATE customers SET name = COALESCE($1,name),email = COALESCE($2,email),phone_number =  COALESCE($3,phone_number),country_code = COALESCE($4,country_code), profile_image = COALESCE($5,profile_image),  dob= COALESCE($6,dob),last_update_time = $7 WHERE id = $8',
      [name, email, phone_number, country_code, profile_image,dob, currentTime, id],
    );


    if (response) {
      return { status: '200', result: 'ok', message: 'Update successfully' };
    }
  }catch (e){
    return { status: '400', result: 'failed', message: e };
  }


};


module.exports.deleteCustomer = async (id) => {

  try{
    const response = await db.query(
      'DELETE FROM customers WHERE id = $1',
      [parseInt(id)],
    );
    if (response) {
      return { status: '200', result: 'ok', message: 'Delete successfully' };
    }
  }catch (e) {
    return { status: '400', result: 'failed', message: e };

  }


};




