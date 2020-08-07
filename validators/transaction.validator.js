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
export const validateToDelete = (transaction) => {
  if (validator.isEmpty(transaction._id)) {
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
export const validateToCreate = (transaction) => {
  console.log('transaction: ', transaction);
  try {
    if (validator.isEmpty(transaction.user)) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'user is invalid', attribute: 'transaction.user' }),
      });
    }
    if (validator.isEmpty(transaction.w_id)) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'w_id is invalid', attribute: 'transaction.w_id' }),
      });
    }
    if (
      !transaction.w_transaction
      || JSON.stringify(transaction.w_transaction) === JSON.stringify({})
    ) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'w_transaction is invalid', attribute: 'transaction.w_transaction' }),
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
export const validateToUpdate = (transaction) => {
  if (transaction.user && validator.isEmpty(transaction.user)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'user is invalid', attribute: 'transaction.user' }),
    });
  }
  if (transaction.status && validator.isEmpty(transaction.status)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'status is invalid', attribute: 'transaction.status' }),
    });
  }
  if (transaction.w_id && validator.isEmpty(transaction.w_id)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'w_id is invalid', attribute: 'transaction.w_id' }),
    });
  }
  if (
    transaction.w_transaction
    && JSON.stringify(transaction.w_transaction) === JSON.stringify({})
  ) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'w_transaction is invalid', attribute: 'transaction.w_transaction' }),
    });
  }
  return { error: false };
};
