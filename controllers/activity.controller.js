/**
* create - Função que cria uma atividade
*
* @function create
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const create = (parent, args, { activities }) => activities.create(args.activity)
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

/**
* findOne - Função que encontra uma atividade por id
*
* @function findOne
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const findOne = (parent, args, { activities }) => activities.findOne({
  $or: [
    { _id: args.id },
  ],
}).lean()
  .then(resp => ({ ...resp, id: resp._id }))
  .catch((err) => {
    throw new Error(err);
  });


/**
 findAll - Função que retorna todos os eventos com os dados indicados.
*
* @function findAll
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const findAll = (parent, args, { activities }) => activities.find(args.activity)
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

/**
* update - Função que atualiza um evento.
*
* @function update
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const update = (parent, args, { activities }) => {
  console.log('args:', args);
  return activities.findOneAndUpdate({ _id: args.activity.id }, args.activity, { new: true })
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
