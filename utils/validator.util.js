/**
 *
 * validateCPF - Essa função valida o cpf retornando true para valido e false para não valido
 *
 * @function validateCPF
 * @param  {string} strCPF  it's the cpf value
 * @returns {boolean} it's the validation result
 */
export const validateCPF = (strCPF) => {
  let sum;
  let rest;
  let i;
  sum = 0;
  if (strCPF === '00000000000') return false;
  for (i = 1; i <= 9; i += 1) sum += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(strCPF.substring(9, 10), 10)) return false;

  sum = 0;
  for (i = 1; i <= 10; i += 1) sum += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(strCPF.substring(10, 11), 10)) return false;
  return true;
};

/**
 *
 * validateBirthDate - Essa função valida uma data de nascimento,
 *    retornando true para valido e false para não valido
 *
 * @function validateBirthDate
 * @param  {string} date  it's the cpf value
 * @returns {boolean} it's the validation result
 */
export const validateBirthDate = (date) => {
  if (!date) return false;
  const myDate = new Date(date);
  if (myDate.toString() === 'Invalid Date') {
    const secDate = new Date(parseInt(date, 10));
    if (secDate.toString() === 'Invalid Date') return false;
  }
  return true;
};


export const regexpValidators = {
  email: string => /\S+@\S+\.\S+/.test(string),
};
