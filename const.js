
// Status Code
exports.API_PREFIX = '/api/v1'
exports.STATUS_SUCCESS_200 = '200'
exports.STATUS_BAD_REQUEST_400 = '400'
exports.STATUS_UNAUTHORIZED = '401'
exports.STATUS_FORBIDDEN = '403'
exports.STATUS_NOT_FOUND = '404'
exports.STATUS_INTERNAL_ERROR = '500'


// Result Return
exports.SUCCESS = 'success'
exports.ERROR_SERVER = "error_server"
exports.ERROR_EMPTY = "error_empty"
exports.ERROR_PARAM = "error_param"


// Default value

exports.defaultNotification =  {
  customer_book_success: 'e',
  customer_book_updated: 'e',
  customer_book_cancelled: 'e',
  customer_reminder: 0,
  customer_reminder_day: 1,
  customer_reminder_hour: 2,
  customer_reminder_min: 5,
  staff_book_success: 'e',
  staff_book_updated: 'e',
  staff_book_cancelled: 'e',
  staff_reminder: 0,
  staff_reminder_day: 1,
  staff_reminder_hour: 2,
  staff_reminder_min: 5
}

exports.defaultConfig = {
  appointment_advance_notice_day: 1,
  appointment_advance_notice_hour: 2,
  appointment_advance_notice_min: 5,
  scheduling_window_month: 1,
  scheduling_window_day: 2,
  slot_window_hour: 1,
  slot_window_min: 2,
  cancellation_policy_cancel: -1,
  price_display: true,
  duration_display: false,
  working_hour_display: true,
  staff_option: true,
  notes: 'This is the best note',
  term_condition_title: '',
  term_condition_url: '',
  callback_title: '',
  callback_url: '',
}