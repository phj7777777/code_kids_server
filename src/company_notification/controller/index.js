const db = require('../../../services/database');
const { ERROR_PARAM, SUCCESS, ERROR_SERVER, ERROR_EMPTY } = require('../../../const');
const {
  createCompanyQuery,
  getCompanyQuery,
  updateCompanyQuery,
  deleteCompanyQuery, createCompanyStaffQuery, getStaffCompanyByIdQuery,
} = require('../../../models/company_model');
const { createCompanyNotificationQuery, getCompanyNotificationQuery, updateCompanyNotificationQuery,
  deleteCompanyNotificationQuery
} = require('../../../models/company_notification_model');


module.exports.createCompanyNotification = async (company) => {

  try {
    if (!company?.organization_name || !company.email || !company.staff_id) {
      return { result: ERROR_PARAM, message: '' };
    }

    //Need to refactor to use SQL transaction
    const response = await createCompanyNotificationQuery(company);

    if (!response.rows[0]) {
      return { result: ERROR_SERVER, message: '' };
    }

    const inserted = response.rows[0];

    return { result: SUCCESS, message: inserted };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};

module.exports.getCompanyNotification = async (id) => {

  try {
    if (!id) {
      return { result: ERROR_PARAM, data: {} };
    }
    const response = await getCompanyNotificationQuery(id);
    if (response?.rows && response?.rows.length > 0) {
      return { result: SUCCESS, data: response.rows[0] };
    } else {
      return { result: ERROR_EMPTY, data: {} };
    }
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message, data: {} };
  }

};


module.exports.updateCompanyNotification = async (id, company) => {

  try {
    if (!id) {
      return { result: ERROR_PARAM, message: company };
    }
    if (!company?.organization_name || !company.email) {
      return { result: ERROR_PARAM, message: company };
    }
    const response = await updateCompanyNotificationQuery(company);
    return { result: SUCCESS, message: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }
};


module.exports.deleteCompanyNotification = async (id) => {
  try {
    if (!id) {
      return { result: ERROR_PARAM, message: '' };
    }
    const response = await deleteCompanyNotificationQuery(id);
    return { result: SUCCESS, message: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }
};



