const db = require('../../../services/database');
const { ERROR_PARAM, SUCCESS, ERROR_SERVER, ERROR_EMPTY } = require('../../../const');
const {
  createCompanyQuery,
  getCompanyQuery,
  updateCompanyQuery,
  deleteCompanyQuery, createCompanyStaffQuery, getStaffCompanyByIdQuery,
} = require('../../../models/company_model');


module.exports.createCompany = async (company) => {

  try {
    if (!company?.organization_name || !company.email || !company.staff_id) {
      return { result: ERROR_PARAM, message: '' };
    }

    //Need to refactor to use SQL transaction
    const response = await createCompanyQuery(company);

    if (!response.rows[0]) {
      return { result: ERROR_SERVER, message: '' };
    }

    const inserted = response.rows[0];

    if (response?.rowCount == 1) {
      const res = await createCompanyStaffQuery(company.staff_id, inserted.id);
      if (!res.rows[0]) {
        return { result: ERROR_SERVER, message: '' };
      }

    } else {
      return { result: ERROR_SERVER, message: '' };
    }

    return { result: SUCCESS, message: inserted };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};

module.exports.getCompany = async (id) => {

  try {
    if (!id) {
      return { result: ERROR_PARAM, data: {} };
    }
    const response = await getCompanyQuery(id);
    if (response?.rows && response?.rows.length > 0) {
      return { result: SUCCESS, data: response.rows[0] };
    } else {
      return { result: ERROR_EMPTY, data: {} };
    }
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message, data: {} };
  }

};


module.exports.updateCompany = async (id, company) => {

  try {
    if (!id) {
      return { result: ERROR_PARAM, message: company };
    }
    if (!company?.organization_name || !company.email) {
      return { result: ERROR_PARAM, message: company };
    }
    const response = await updateCompanyQuery(company);
    return { result: SUCCESS, message: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }
};


module.exports.deleteCompany = async (id) => {
  try {
    if (!id) {
      return { result: ERROR_PARAM, message: '' };
    }
    const response = await deleteCompanyQuery(id);
    return { result: SUCCESS, message: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }
};


module.exports.getStaffCompanyById = async (id) =>{
  try {
    if (!id) {
      return { result: ERROR_PARAM, message: '' };
    }
    const response = await getStaffCompanyByIdQuery(id);

    return { result: SUCCESS, message: response.rows };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

}
