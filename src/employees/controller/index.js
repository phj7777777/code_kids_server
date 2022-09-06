const { error, info } = require('log');
const db = require('../../../services/database');
const { i } = require('log/lib/printf-modifiers');


module.exports.createEmployee = async (employee) => {

  const currentTime = new Date();
  const {
    name,
    profile_image,
    position,
  } = employee;
  const { rows } = await db.query(
    'INSERT INTO employees (name, profile_image, position, last_update_time, created_time) VALUES ($1, $2, $3, $4,$4)',
    [name, profile_image, position, currentTime],
  );

  if (rows) {
    return { status: '200', result: 'ok', message: rows };
  }

};

module.exports.getEmployee = async (id) => {
  const response = await db.query(
    'SELECT * FROM employees WHERE id = $1 LIMIT 1',
    [id],
  );

  if (response?.rows) {
    return { status: '200', result: 'ok', message: response.rows[0] };
  }
};

module.exports.updateEmployee = async (id, employee) => {
  const currentTime = new Date();
  const {
    name,
    profile_image,
    position,
  } = employee;

  const response = await db.query(
    'UPDATE employees SET name = COALESCE($1,name), profile_image = COALESCE($2,profile_image), position= COALESCE($3,position), last_update_time = $4  WHERE id = $5',
    [name, profile_image, position, currentTime, id],
  );

  if (response) {
    return { status: '200', result: 'ok', message: 'Update successfully' };
  }
};


module.exports.deleteEmployee = async (id) => {
  const response = await db.query(
    'DELETE FROM employees WHERE id = $1',
    [parseInt(id)],
  );
  if (response) {
    return { status: '200', result: 'ok', message: 'Delete successfully' };
  }
};




