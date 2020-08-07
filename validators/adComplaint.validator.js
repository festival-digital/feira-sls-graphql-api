import validator from 'validator';

/**
* validateAdComplaintToDelete - static function that verify if ad complaint is valid
*
* @
* @function validateAdComplaintToDelete
* @param  {object}  parent    it contains the result returned from the resolver
* on the parent type
* @returns {object} it's validate response, contain the attributes error and msg.
*/
export const validateAdComplaintToDelete = (adComplaint) => {
  if (adComplaint._id && validator.isEmpty(adComplaint._id)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: '_id is required', attribute: '_id' }),
    });
  }
  return { error: false };
};

/**
* validateAdComplaintToCreate - static function that verify if ad complaint is valid
*
* @
* @function validateAdComplaintToCreate
* @param  {object}  parent    it contains the result returned from the resolver
* on the parent type
* @returns {object} it's validate response, contain the attributes error and msg.
*/
export const validateAdComplaintToCreate = (adComplaint) => {
  if (validator.isEmpty(adComplaint.option)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'option is invalid', attribute: 'option' }),
    });
  }
  if (validator.isEmpty(adComplaint.explanation)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'explanation is invalid', attribute: 'explanation' }),
    });
  }
  if (validator.isEmpty(adComplaint.ad)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'ad is invalid', attribute: 'ad' }),
    });
  }
  return { error: false };
};

/**
* validateAdComplaintToUpdate - static function that verify if ad complaint is valid
*
* @async
* @function validateAdComplaintToUpdate
* @param  {object}  parent    it contains the result returned from the resolver
* on the parent type
* @returns {object} it's validate response, contain the attributes error and msg.
*/
export const validateAdComplaintToUpdate = (adComplaint) => {
  if (validator.isEmpty(adComplaint._id)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: '_id is invalid', attribute: '_id' }),
    });
  }
  if (validator.isEmpty(adComplaint.option)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'option is invalid', attribute: 'option' }),
    });
  }
  if (validator.isEmpty(adComplaint.explanation)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'explanation is invalid', attribute: 'explanation' }),
    });
  }
  if (validator.isEmpty(adComplaint.ad)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'ad is invalid', attribute: 'ad' }),
    });
  }
  return { error: false };
};
