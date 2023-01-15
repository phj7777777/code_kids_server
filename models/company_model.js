const db = require('../services/database');
const { createCompanyConfigQuery } = require('./company_config_model');
const { createCompanyNotificationQuery } = require('./company_notification_model');
const { createStaffQuery } = require('./staff_model');
const { createStaff } = require('../src/staffs/controller');
const { defaultNotification, defaultConfig } = require('../const');

async function createCompanyQuery(company) {

  const currentTime = new Date();
  const {
    organization_name,
    description,
    industry,
    email,
    booking_policy,
    address,
    country,
    phone_number,
    country_code,
    profile_image,
    url,
  } = company;

  return await db.query(
    'INSERT INTO companies (organization_name, description, email, booking_policy, address, country, phone_number, country_code, profile_image, url, last_update_time, created_time, industry) VALUES ($1, $2, $3, $4,$5, $6, $7, $8,$9, $10, $11, $11,$12) RETURNING id',
    [organization_name, description, email, booking_policy, address, country, phone_number, country_code, profile_image, url, currentTime, industry],
  );


};

module.exports.getCompanyQuery = async (id) => {
  return await db.query(
    'SELECT * FROM companies WHERE id = $1 LIMIT 1',
    [id],
  );
};


module.exports.updateCompanyQuery = async (id, company) => {

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

  return await db.query(
    'UPDATE companies SET name = COALESCE($1,name), description = COALESCE($2,description), email= COALESCE($3,email), booking_policy= COALESCE($4,booking_policy), address= COALESCE($5,address), country= COALESCE($6,country), phone_number= COALESCE($7,phone_number), country_code= COALESCE($8,country_code), profile_image= COALESCE($9,profile_image), url= COALESCE($10,url), last_update_time= $11, WHERE id = $12',
    [name, description, email, booking_policy, address, country, phone_number, country_code, profile_image, url, currentTime, id],
  );

};


module.exports.deleteCompanyQuery = async (id) => {
  return await db.query(
    'DELETE FROM companies WHERE id = $1',
    [id],
  );

};

async function createCompanyStaffQuery(staffId, companyId){

  return await db.query(
    'INSERT INTO companies_staffs (staff_id, company_id) VALUES ($1,$2) RETURNING *',
    [staffId, companyId],
  );
};


module.exports.getStaffCompanyByIdQuery = async (id) => {
  return await db.query(
    'SELECT * FROM companies_staffs WHERE staff_id = $1',
    [id],
  );

};


/*
  1. Create company in companies table using staff_id
  2. Create first staff
  3. Create company notification with default value
  4. Create company working hour (set default value if working hour is null)
  5. Create company config with default value
*/

module.exports.initCompanyQuery = async (company) => {


  try {
    await db.query('BEGIN');
    const response = await createCompanyQuery(company);
    const inserted = response.rows[0];
    console.log(inserted)
    const res = await createCompanyStaffQuery(company.staff_id, inserted.id);
    await createCompanyNotificationQuery(defaultNotification, inserted.id);
    await createCompanyConfigQuery(defaultConfig, inserted.id);

    await db.query('COMMIT')
    return inserted.id
  } catch (e) {
    await db.query('ROLLBACK')
    throw e
  }

};
