/**
* create - Cria um ticket no banco de dados
*
* @function create
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const create = (parent, args, { tickets }) => tickets.create(args.ticket).lean()
  .then(resp => ({ ...resp, id: resp._id }))
  .catch((err) => {
    throw new Error(err);
  });

/**
* findOne - Função que acha um ticket pelo id
*
* @function findOne
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const findOne = (parent, args, { tickets }) => tickets.findOne({
  $or: [
    { _id: args.id },
  ],
}).lean()
  .then(resp => ({ ...resp, id: resp._id }))
  .catch((err) => {
    throw new Error(err);
  });


/**
  findAll - Função que retorna o ticket com as informações indicadas
*
* @function findAll
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const findAll = (parent, args, { tickets }) => tickets.find(args.ticket).lean()
  .then(resp => resp.map(usr => ({ ...usr, id: resp._id })))
  .catch((err) => {
    throw new Error(err);
  });

/**
* update - FUnção que atualiza um ticket
*
* @function update
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const update = (parent, args, { tickets }) => tickets
  .findOneAndUpdate({ _id: args.ticket.id }, args.ticket, { new: true })
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

export default {
  create,
  findOne,
  findAll,
  update,
};
