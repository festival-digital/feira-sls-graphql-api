import validator from 'validator';

/**
* validateCommentToDelete - static function that verify if ad complaint is valid
*
* @
* @function validateCommentToDelete
* @param  {object}  parent    it contains the result returned from the resolver
* on the parent type
* @returns {object} it's validate response, contain the attributes error and msg.
*/
export const validateCommentToDelete = (comment) => {
  if (comment._id && validator.isEmpty(comment._id)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: '_id is required', attribute: '_id' }),
    });
  }
  return { error: false };
};

/**
* validateCommentToCreate - static function that verify if ad complaint is valid
*
* @
* @function validateCommentToCreate
* @param  {object}  parent    it contains the result returned from the resolver
* on the parent type
* @returns {object} it's validate response, contain the attributes error and msg.
*/
export const validateCommentToCreate = (comment) => {
  if (validator.isEmpty(comment.comment)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'comment is invalid', attribute: 'comment' }),
    });
  }
  if (!(
    comment.ad
    || comment.user
    || comment.order
    || comment.offer
  )) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'ad, user, order or offer is required', attribute: 'link' }),
    });
  }
  return { error: false };
};

/**
* validateCommentToUpdate - static function that verify if ad complaint is valid
*
* @async
* @function validateCommentToUpdate
* @param  {object}  parent    it contains the result returned from the resolver
* on the parent type
* @returns {object} it's validate response, contain the attributes error and msg.
*/
export const validateCommentToUpdate = (comment) => {
  if (validator.isEmpty(comment.comment)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'comment is invalid', attribute: 'comment' }),
    });
  }
  return { error: false };
};
