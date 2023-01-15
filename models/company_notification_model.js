const db = require('../services/database');

module.exports.createCompanyNotificationQuery = async (company, company_id) => {

  const currentTime = new Date();
  const {
    customer_book_success,
    customer_book_updated,
    customer_book_cancelled,
    customer_appointment_reminder,
    customer_reminder_time,
    staff_book_success,
    staff_book_updated,
    staff_book_cancelled,
    staff_appointment_reminder,
    staff_reminder_time,
  } = company;

  return await db.query(
    'INSERT INTO company_notification (company_id, customer_book_success, customer_book_updated, customer_book_cancelled, customer_appointment_reminder, customer_reminder_time, staff_book_success, staff_book_updated, staff_book_cancelled, staff_appointment_reminder, staff_reminder_time,last_update_time) VALUES ($1, $2, $3, $4,$5, $6, $7, $8,$9, $10, $11, $12) RETURNING company_id',
    [company_id, customer_book_success, customer_book_updated, customer_book_cancelled, customer_appointment_reminder, customer_reminder_time, staff_book_success, staff_book_updated, staff_book_cancelled, staff_appointment_reminder,  staff_reminder_time, currentTime],
  );


};

module.exports.getCompanyNotificationQuery = async (id) => {
  return await db.query(
    'SELECT * FROM company_notification WHERE id = $1 LIMIT 1',
    [id],
  );
};


module.exports.updateCompanyNotificationQuery = async (id, company) => {

  const currentTime = new Date();
  const {
    customer_book_success,
    customer_book_updated,
    customer_book_cancelled,
    customer_appointment_reminder,
    customer_reminder_time,
    staff_book_success,
    staff_book_updated,
    staff_book_cancelled,
    staff_appointment_reminder,
    staff_reminder_time,
  } = company;

  return await db.query(
    'UPDATE company_notification SET customer_book_success = COALESCE($1,customer_book_success), customer_book_updated = COALESCE($2,customer_book_updated), customer_book_cancelled= COALESCE($3,customer_book_cancelled), customer_appointment_reminder= COALESCE($4,customer_appointment_reminder), customer_reminder_time= COALESCE($5,customer_reminder_time), staff_book_success= COALESCE($6,staff_book_success), staff_book_updated= COALESCE($7,staff_book_updated), staff_book_cancelled= COALESCE($8,staff_book_cancelled), staff_appointment_reminder= COALESCE($9,staff_appointment_reminder), staff_reminder_time= COALESCE($10,staff_reminder_time), last_update_time= $11, WHERE id = $12',
    [customer_book_success, customer_book_updated, customer_book_cancelled, customer_appointment_reminder, customer_reminder_time, staff_book_success, staff_book_updated, staff_book_cancelled, staff_appointment_reminder,  staff_reminder_time, currentTime],
  );

};


module.exports.deleteCompanyNotificationQuery = async (id) => {
  return await db.query(
    'DELETE FROM company_notification WHERE id = $1',
    [id],
  );

};
