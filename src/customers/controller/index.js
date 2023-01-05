const { SUCCESS, ERROR_SERVER, ERROR_PARAM, ERROR_EMPTY } = require('../../../const');
const {
  createCustomerQuery,
  getAllCustomerQuery,
  getCustomerQuery,
  updateCustomerQuery, deleteCustomerQuery,
} = require('../../../models/customer_model');


module.exports.createCustomer = async (customer) => {
  try {
    if (!customer.name && customer.name !== '') {
      return { result: ERROR_PARAM, message: '' };
    }
    const response = await createCustomerQuery(customer);
    return { result: SUCCESS, message: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};

module.exports.getAllCustomer = async () => {

  try {
    const response = await getAllCustomerQuery();
    if (!response) {
      return { result: ERROR_EMPTY, data: '' };
    }
    return { result: SUCCESS, data: response.rows };

  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};


module.exports.getCustomer = async (id) => {
  try {
    if (!id) {
      return { result: ERROR_PARAM, data: '' };
    }
    const response = await getCustomerQuery(id);
    if (response?.rows && response?.rows.length > 0) {
      return { status: '200', result: 'ok', data: response.rows[0] };
    } else {
      return { result: ERROR_EMPTY, message: '' };
    }
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }
};

module.exports.updateCustomer = async (id, customer) => {

  try {
    if (!id) {
      return { result: ERROR_PARAM, data: customer };
    }
    if (!customer.name && customer.name !== '') {
      return { result: ERROR_PARAM, data: customer };
    }
    const response = await updateCustomerQuery(id,customer);
    return { result: SUCCESS, message: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};


module.exports.deleteCustomer = async (id) => {

  try {
    if (!id) {
      return { result: ERROR_PARAM, data: '' };
    }
    const response = await deleteCustomerQuery(id);
    return { result: SUCCESS, data: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};




