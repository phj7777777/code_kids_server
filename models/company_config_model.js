const db = require('../services/database');

module.exports.createCompanyConfigQuery = async (company) => {

  const currentTime = new Date();
  const {
    advance_notice,
    scheduling_window,
    slot_window,
    price_display,
    duration_display,
    working_hour_display,
    staff_option,
    notes,
    term_condition_title,
    term_condition_url,
    callback_title,
    callback_url,
  } = company;

  return await db.query(
    'INSERT INTO company_config (advance_notice, scheduling_window, slot_window, price_display, duration_display,working_hour_display, staff_option, notes, term_condition_title, term_condition_url,callback_title,callback_url, last_update_time) VALUES ($1, $2, $3, $4,$5, $6, $7, $8,$9, $10, $11, $12,$13) RETURNING id',
    [advance_notice, scheduling_window, slot_window, price_display, duration_display, working_hour_display, staff_option, notes, term_condition_title, term_condition_url,callback_title,callback_url, currentTime],
  );


};

module.exports.getCompanyConfigQuery = async (id) => {
  return await db.query(
    'SELECT * FROM company_config WHERE id = $1 LIMIT 1',
    [id],
  );
};


module.exports.updateCompanyConfigQuery = async (id, company) => {

  const currentTime = new Date();
  const {
    advance_notice,
    scheduling_window,
    slot_window,
    price_display,
    duration_display,
    working_hour_display,
    staff_option,
    notes,
    term_condition_title,
    term_condition_url,
    callback_title,
    callback_url,
  } = company;

  return await db.query(
    'UPDATE company_config SET advance_notice = COALESCE($1,advance_notice), scheduling_window = COALESCE($2,scheduling_window), slot_window= COALESCE($3,slot_window), price_display= COALESCE($4,price_display), duration_display= COALESCE($5,duration_display), working_hour_display= COALESCE($6,working_hour_display), staff_option= COALESCE($7,staff_option), notes= COALESCE($8,notes), term_condition_title= COALESCE($9,term_condition_title), term_condition_url= COALESCE($10,term_condition_url), last_update_time = COALESCE($10,last_update_time) WHERE id = $12 RETURNING id',
    [advance_notice, scheduling_window, slot_window, price_display, duration_display, working_hour_display, staff_option, notes, term_condition_title, term_condition_url,callback_title,callback_url, currentTime],
  );

};


module.exports.deleteCompanyConfigQuery = async (id) => {
  return await db.query(
    'DELETE FROM company_config WHERE id = $1',
    [id],
  );

};