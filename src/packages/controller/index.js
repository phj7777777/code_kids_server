const { error, info } = require('log');
const db = require('../../../services/database');


module.exports.createPackage = async (package) => {

  const currentTime = new Date();
  const {
    name,
    description,
    pricing_type,
    price,
    currency,
  } = package;
  const { rows } = await db.query(
    'INSERT INTO packages (name, description, pricing_type,price, currency,last_update_time, created_time) VALUES ($1, $2, $3, $4,$5,$6, $6)',
    [name, description, pricing_type, price, currency, currentTime],
  );

  if (rows) {
    return { status: '200', result: 'ok', message: rows };
  }

};

module.exports.getPackage = async (id) => {
  const response = await db.query(
    'SELECT * FROM packages WHERE id = $1 LIMIT 1',
    [id],
  );

  if (response?.rows) {
    return { status: '200', result: 'ok', message: response.rows[0] };
  }
};

module.exports.updatePackage = async (id, package) => {
  const currentTime = new Date();
  const {
    name,
    description,
    pricing_type,
    price,
    currency,
  } = package;

  const response = await db.query(
    'UPDATE packages SET name = COALESCE($1,name), description = COALESCE($2,description), pricing_type= COALESCE($3,pricing_type), price= COALESCE($4,price),  currency= COALESCE($5,currency), last_update_time = $6  WHERE id = $7',
    [name, description, pricing_type, price, currency, currentTime, id],
  );

  if (response) {
    return { status: '200', result: 'ok', message: 'Update successfully' };
  }
};


module.exports.deletePackage = async (id) => {
  const response = await db.query(
    'DELETE FROM packages WHERE id = $1',
    [parseInt(id)],
  );
  if (response) {
    return { status: '200', result: 'ok', message: 'Delete successfully' };
  }
};




