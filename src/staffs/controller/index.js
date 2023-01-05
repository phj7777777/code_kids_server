const { ERROR_PARAM, ERROR_SERVER, SUCCESS, ERROR_EMPTY, STATUS_SUCCESS_200 } = require('../../../const');
const {
  getStaffQuery,
  getAllStaffQuery,
  createStaffQuery,
  updateStaffQuery,
  deleteStaffQuery,
} = require('../../../models/staff_model');
const logger = require('../../../logger');

module.exports.createStaff = async (staff) => {
  try {
    if (!staff.name || !staff.email) {
      logger.error('create_staff|error_param|%s', staff);
      return { result: ERROR_PARAM, message: '' };
    }
    const response = await createStaffQuery(staff);
    return { result: SUCCESS, message: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};

module.exports.getAllStaff = async () => {

  try {
    const response = await getAllStaffQuery();
    console.log(response.rows);
    if (!response) {
      return { result: ERROR_EMPTY, data: '' };
    }
    return { result: SUCCESS, data: response.rows };

  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};

module.exports.getStaff = async (id) => {

  try {
    if (!id) {
      return { result: ERROR_PARAM, message: '' };
    }
    const response = await getStaffQuery(id);
    if (response?.rows && response?.rows.length > 0) {
      return { result: SUCCESS, data: response.rows[0] };
    } else {
      return { result: ERROR_EMPTY, data: '' };
    }
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};

module.exports.updateStaff = async (id, staff) => {

  try {
    if (!id) {
      return { result: ERROR_PARAM, data: staff };
    }
    if (!staff.name && staff.name !== '') {
      return { result: ERROR_PARAM, data: staff };
    }
    await updateStaffQuery(id, staff);
    return { result: SUCCESS, data: staff };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }
};


module.exports.deleteStaff = async (id) => {
  try {
    if (!id) {
      return { result: ERROR_PARAM, message: '' };
    }
    const response = await deleteStaffQuery(id);
    return { result: SUCCESS, data: response };
  } catch (e) {
    return { result: ERROR_SERVER, message: e.message };
  }

};




