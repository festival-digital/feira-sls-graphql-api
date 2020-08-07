/**
* create - static function that create one user in database.
*
* @function create
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const create = (parent, args, { users }) => users.create(args.user).lean()
  .then(resp => ({ ...resp, id: resp._id }))
  .catch((err) => {
    throw new Error(err);
  });

/**
* findOne - function that find one user in database, generally using an mongo _id attribute.
*
* @function findOne
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const findOne = (parent, args, { users }) => users.findOne({
  $or: [
    { _id: args.id },
    { email: args.email },
  ],
}).lean()
  .then(resp => ({ ...resp, id: resp._id }))
  .catch((err) => {
    throw new Error(err);
  });


/**
 - function that find all users in database, returning all users or some users that
* have some match with indicated attribute.
*
* @function findAll
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const findAll = (parent, args, { users }) => users.find(args.user).lean()
  .then(resp => resp.map(usr => ({ ...usr, id: resp._id })))
  .catch((err) => {
    throw new Error(err);
  });

/**
* update - function that update one user in database, generally using an mongo _id attribute.
*
* @function update
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const update = (parent, args, { users }) => {
  console.log('args:', args);
  return users.findOneAndUpdate({ _id: args.user.id }, args.user, { new: true })
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

export default {
  create,
  findOne,
  findAll,
  update,
};
