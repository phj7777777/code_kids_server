const db = require('../services/database');

module.exports.createStaffQuery = async (staff) => {

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

  return await db.query(
    'INSERT INTO staffs (name, email, phone_number, country_code, profile_image, position,dob,  last_update_time, created_time) VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$8)',
    [name, email, phone_number, country_code, profile_image, position,dob, currentTime],
  );

};


module.exports.getAllStaffQuery = async () => {

  return await db.query('SELECT * FROM staffs');

};

module.exports.getStaffQuery = async (id) => {
  return await db.query(
    'SELECT * FROM staffs WHERE id = $1 LIMIT 1',
    [id],
  );
};

module.exports.updateStaffQuery = async (id, staff) => {
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

  return await db.query(
    'UPDATE staffs SET name = COALESCE($1,name),email = COALESCE($2,email),phone_number =  COALESCE($3,phone_number),country_code = COALESCE($4,country_code), profile_image = COALESCE($5,profile_image), position= COALESCE($6,position), dob= COALESCE($7,dob),last_update_time = $8 WHERE id = $9',
    [name, email, phone_number, country_code, profile_image, position,dob, currentTime, id],
  );

};

module.exports.deleteStaffQuery = async (id) => {
  return await db.query(
    'DELETE FROM staffs WHERE id = $1',
    [parseInt(id)],
  );
};