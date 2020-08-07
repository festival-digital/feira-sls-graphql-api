import validator from 'validator';

/**
* validateToDelete - static function that verify if ad complaint is valid
*
* @
* @function validateToDelete
* @param  {object}  parent    it contains the result returned from the resolver
* on the parent type
* @returns {object} it's validate response, contain the attributes error and msg.
*/
export const validateToDelete = (payment) => {
  if (validator.isEmpty(payment._id)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: '_id is required', attribute: '_id' }),
    });
  }
  return { error: false };
};

/**
* validateToCreate - static function that verify if ad complaint is valid
*
* @
* @function validateToCreate
* @param  {object}  parent    it contains the result returned from the resolver
* on the parent type
* @returns {object} it's validate response, contain the attributes error and msg.
*/
export const validateToCreate = (payment) => {
  console.log('payment: ', payment);
  try {
    if (validator.isEmpty(payment.order)) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'order_id is invalid', attribute: 'payment.order_id' }),
      });
    }
    if (validator.isEmpty(payment.customer)) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'explanation is invalid', attribute: 'customer' }),
      });
    }
    if (validator.isEmpty(payment.w_id)) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'w_id is invalid', attribute: 'payment.w_id' }),
      });
    }
    if (!payment.w_payment || JSON.stringify(payment.w_payment) === JSON.stringify({})) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'w_payment is invalid', attribute: 'payment.w_payment' }),
      });
    }
    return { error: false };
  } catch (err) {
    throw err;
  }
};

/**
* validateToUpdate - static function that verify if ad complaint is valid
*
* @async
* @function validateToUpdate
* @param  {object}  parent    it contains the result returned from the resolver
* on the parent type
* @returns {object} it's validate response, contain the attributes error and msg.
*/
export const validateToUpdate = (payment) => {
  if (payment.order_id && validator.isEmpty(payment.order_id)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'order_id is invalid', attribute: 'payment.order_id' }),
    });
  }
  if (payment.customer && validator.isEmpty(payment.customer)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'explanation is invalid', attribute: 'customer' }),
    });
  }
  if (payment.w_id && validator.isEmpty(payment.w_id)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'w_id is invalid', attribute: 'payment.w_id' }),
    });
  }
  if (payment.w_payment && JSON.stringify(payment.w_payment) === JSON.stringify({})) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'w_payment is invalid', attribute: 'payment.w_payment' }),
    });
  }
  return { error: false };
};
