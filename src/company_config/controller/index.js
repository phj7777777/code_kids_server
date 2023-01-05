const { ERROR_PARAM, SUCCESS, ERROR_SERVER, ERROR_EMPTY } = require('../../../const');
const { createCompanyConfigQuery, getCompanyConfigQuery, updateCompanyConfigQuery, deleteCompanyConfigQuery } = require('../../../models/company_config_model');


module.exports.createCompanyConfig = async (company) => {

  try {
    const response = await createCompanyConfigQuery(company);

    if (!response.rows[0]) {
      return { result: ERROR_SERVER, message: '' };
    }

    const inserted = response.rows[0];

    return { result: SUCCESS, message: inserted };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};

module.exports.getCompanyConfig = async (id) => {

  try {
    if (!id) {
      return { result: ERROR_PARAM, data: {} };
    }
    const response = await getCompanyConfigQuery(id);
    if (response?.rows && response?.rows.length > 0) {
      return { result: SUCCESS, data: response.rows[0] };
    } else {
      return { result: ERROR_EMPTY, data: {} };
    }
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message, data: {} };
  }

};


module.exports.updateCompanyConfig = async (id, company) => {

  try {
    if (!id) {
      return { result: ERROR_PARAM, message: company };
    }
    if (!company?.organization_name || !company.email) {
      return { result: ERROR_PARAM, message: company };
    }
    const response = await updateCompanyConfigQuery(company);
    return { result: SUCCESS, message: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }
};


module.exports.deleteCompanyConfig = async (id) => {
  try {
    if (!id) {
      return { result: ERROR_PARAM, message: '' };
    }
    const response = await deleteCompanyConfigQuery(id);
    return { result: SUCCESS, message: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }
};
