const db = require('../../../services/database');
const { ERROR_PARAM, SUCCESS, ERROR_SERVER, ERROR_EMPTY, } = require('../../../const');
const { createCompanyQuery, getCompanyQuery, updateCompanyQuery, deleteCompanyQuery } = require('../../../models/company_model');


module.exports.createCompany = async (company) => {

  try{
    if (!company?.organization_name || !company.email) {
      return { result: ERROR_PARAM, message: '' };
    }
    const response = await createCompanyQuery(company);
    return { result: SUCCESS, message: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};

module.exports.getCompany = async (id) => {

  try {
    if (!id) {
      return { result: ERROR_PARAM, message: '' };
    }
    const response = await getCompanyQuery(id);
    if (response?.rows && response?.rows.length > 0) {
      return {result: SUCCESS, message: response.rows[0] };
    } else {
      return { result: ERROR_EMPTY, message: '' };
    }
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
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




