import validator from 'validator';

/**
* validateBankAccountToDelete - function that verify if bank account is valid
*
* @
* @function validateBankAccountToDelete
* @param  {object}  parent    it contains the result returned from the resolver
* on the parent type
* @returns {object} it's validate response, contain the attributes error and msg.
*/
export const validateBankAccountToDelete = (bankAccount) => {
  if (bankAccount._id && validator.isEmpty(bankAccount._id)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: '_id is required', attribute: '_id' }),
    });
  }
  return { error: false };
};

/**
* validateBankAccountToCreate - function that verify if bank account is valid
*
* @
* @function validateBankAccountToCreate
* @param  {object}  parent    it contains the result returned from the resolver
* on the parent type
* @returns {object} it's validate response, contain the attributes error and msg.
*/
export const validateBankAccountToCreate = (bankAccount) => {
  try {
    if (validator.isEmpty(bankAccount.status)) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'invalid field', attribute: 'status' }),
      });
    }
    if (validator.isEmpty(bankAccount.bank_name)) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'invalid field', attribute: 'bank_name' }),
      });
    }
    if (validator.isEmpty(bankAccount.agency_number)) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'invalid field', attribute: 'agency_number' }),
      });
    }
    if (validator.isEmpty(bankAccount.holder_name)) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'invalid field', attribute: 'holder_name' }),
      });
    }
    if (validator.isEmpty(bankAccount.account_number)) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'invalid field', attribute: 'account_number' }),
      });
    }
    if (validator.isEmpty(bankAccount.holder_cpf)) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'invalid field', attribute: 'holder_cpf' }),
      });
    }
    if (validator.isEmpty(bankAccount.wirecard_id)) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'invalid field', attribute: 'wirecard_id' }),
      });
    }
    if (!bankAccount.wirecard_bank_account) {
      return ({
        error: true,
        msg: JSON.stringify({ msg: 'invalid field', attribute: 'wirecard_bank_account' }),
      });
    }
    return { error: false };
  } catch (err) {
    return ({
      error: true,
      msg: JSON.stringify({
        info: err,
        msg: 'internal server error during validation',
        attribute: 'server_error',
      }),
    });
  }
};
