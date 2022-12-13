const { error, info } = require('log');
const db = require('../../../services/database');
const { i } = require('log/lib/printf-modifiers');


module.exports.createStaff = async (staff) => {

  try {
    const currentTime = new Date();
    const {
      name,
      profile_image,
      position,
    } = staff;
    const { rows } = await db.query(
      'INSERT INTO staffs (name, profile_image, position, last_update_time, created_time) VALUES ($1, $2, $3, $4,$4)',
      [name, profile_image, position, currentTime],
    );

    return { status: '200', result: 'ok', data: rows };
  } catch (e) {
    return { status: '400', result: '', data: e.toString() };
  }


};

module.exports.getAllStaff = async (id) => {
  const response = await db.query(
    'SELECT * FROM staffs ',
  );

  if (response?.rows) {
    return { status: '200', result: 'ok', data: response.rows };
  }
};

module.exports.getStaff = async (id) => {
  const response = await db.query(
    'SELECT * FROM staffs WHERE id = $1 LIMIT 1',
    [id],
  );

  if (response?.rows) {
    return { status: '200', result: 'ok', data: response.rows[0] };
  }
};

module.exports.updateStaff = async (id, staff) => {
  const currentTime = new Date();
  const {
    name,
    email,
    phone_number,
    country_code,
    profile_image,
    position,
    dob,
  } = staff;

  const response = await db.query(
    'UPDATE staffs SET name = COALESCE($1,name),email = COALESCE($2,email),phone_number =  COALESCE($3,phone_number),country_code = COALESCE($4,country_code), profile_image = COALESCE($5,profile_image), position= COALESCE($6,position), dob= COALESCE($7,dob),last_update_time = $8 WHERE id = $9',
    [name, email, phone_number, country_code, profile_image, position,dob, currentTime, id],
  );



  if (response) {
    return { status: '200', result: 'ok', data: 'Update successfully' };
  }
};


module.exports.deleteStaff = async (id) => {
  const response = await db.query(
    'DELETE FROM staffs WHERE id = $1',
    [parseInt(id)],
  );
  if (response) {
    return { status: '200', result: 'ok', data: 'Delete successfully' };
  }
};




