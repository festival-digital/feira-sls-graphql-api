// import { regexpValidators, validateBirthDate, validateCPF } from '../utils/validator.util';

/**
  *
  * validateUser - Função que valida se o usuário tem os campos necessários e se eles são válidos
  *
  * @function validateUser
  * @param {object} user
  * @param {string} user.cpf it contains the cpf
  * @param {string} user.email it contains the e-mail
  * @param {string} user.first_name it contains the first name
  * @param {string} user.last_name it contains the last name
  * @param {string} user.birth_date it contains the birth date
  * @param {string} user.ida it contains the ida id
  */
export const validateUser = (user) => {
  const { ida } = user;
  // if (!cpf) throw new TypeError('validation/empty/cpf');
  // if (!validateCPF(cpf)) throw new TypeError('validation/invalid/cpf');

  // if (!email) throw new TypeError('validation/empty/email');
  // if (!regexpValidators.email(email)) throw new TypeError('validation/invalid/email');

  // if (!first_name) throw new TypeError('validation/empty/first_name');
  // if (first_name.length < 2) throw new TypeError('validation/invalid/first_name');

  // if (!last_name) throw new TypeError('validation/empty/last_name');
  // if (last_name.length < 2) throw new TypeError('validation/invalid/last_name');

  // if (!birth_date) throw new TypeError('validation/empty/birth_date')
  // if (birth_date && !validateBirthDate(birth_date))
  //    throw new TypeError('validation/invalid/birth_date');

  if (!ida) throw new TypeError('validation/empty/ida');
};

export const todelete = '';
