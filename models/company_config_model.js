const db = require('../services/database');

module.exports.createCompanyConfigQuery = async (company, company_id) => {

  const currentTime = new Date();
  const {
    appointment_advance_notice_day,
    appointment_advance_notice_hour,
    appointment_advance_notice_min,
    scheduling_window_month,
    scheduling_window_day,
    slot_window_hour,
    slot_window_min,
    cancellation_policy_cancel,
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
    'INSERT INTO company_config (company_id, appointment_advance_notice_day, appointment_advance_notice_hour, appointment_advance_notice_min,' +
    ' scheduling_window_month, scheduling_window_day,slot_window_hour,\n' +
    '      slot_window_min,\n' +
    '      cancellation_policy_cancel,\n' +
    '      price_display,\n' +
    '      duration_display,\n' +
    '      working_hour_display,\n' +
    '      staff_option,\n' +
    '      notes,\n' +
    '      term_condition_title,\n' +
    '      term_condition_url,\n' +
    '      callback_title,\n' +
    '      callback_url, last_update_time) VALUES ($1, $2, $3, $4,$5, $6, $7, $8,$9, $10, $11, $12,$13,$14,$15,$16,$17, $18, $19) RETURNING company_id',
    [company_id, appointment_advance_notice_day,
      appointment_advance_notice_hour,
      appointment_advance_notice_min,
      scheduling_window_month,
      scheduling_window_day,
      slot_window_hour,
      slot_window_min,
      cancellation_policy_cancel,
      price_display,
      duration_display,
      working_hour_display,
      staff_option,
      notes,
      term_condition_title,
      term_condition_url,
      callback_title,
      callback_url, currentTime],
  );


};

module.exports.getCompanyConfigQuery = async (id) => {
  return await db.query(
    'SELECT * FROM company_config WHERE company_id = $1 LIMIT 1',
    [id],
  );
};


module.exports.updateCompanyConfigQuery = async (id, company) => {

  const currentTime = new Date();
  const {
    appointment_advance_notice_day,
    appointment_advance_notice_hour,
    appointment_advance_notice_min,
    scheduling_window_month,
    scheduling_window_day,
    slot_window_hour,
    slot_window_min,
    cancellation_policy_cancel,
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
    'UPDATE company_config SET appointment_advance_notice_day = COALESCE($1,appointment_advance_notice_day), appointment_advance_notice_hour = COALESCE($2,appointment_advance_notice_hour),' +
    'appointment_advance_notice_min= COALESCE($3,appointment_advance_notice_min), scheduling_window_month= COALESCE($4,scheduling_window_month),' +
    'scheduling_window_day= COALESCE($5,scheduling_window_day), slot_window_hour= COALESCE($6,slot_window_hour), slot_window_min= COALESCE($7,slot_window_min), cancellation_policy_cancel= COALESCE($8,cancellation_policy_cancel),' +
    'price_display= COALESCE($9,price_display), duration_display= COALESCE($10,duration_display), working_hour_display= COALESCE($11,working_hour_display), ' +
    'staff_option= COALESCE($12,staff_option), notes= COALESCE($13,notes), term_condition_title= COALESCE($14,term_condition_title), ' +
    'term_condition_url= COALESCE($15,term_condition_url), callback_title= COALESCE($16,callback_title), callback_url= COALESCE($17,callback_url),' +
    ' last_update_time = COALESCE($18,last_update_time) WHERE company_id = $19',
    [ appointment_advance_notice_day,
      appointment_advance_notice_hour,
      appointment_advance_notice_min,
      scheduling_window_month,
      scheduling_window_day,
      slot_window_hour,
      slot_window_min,
      cancellation_policy_cancel,
      price_display,
      duration_display,
      working_hour_display,
      staff_option,
      notes,
      term_condition_title,
      term_condition_url,
      callback_title,
      callback_url, currentTime, id,]
  );

};


module.exports.deleteCompanyConfigQuery = async (id) => {
  return await db.query(
    'DELETE FROM company_config WHERE id = $1',
    [id],
  );

};