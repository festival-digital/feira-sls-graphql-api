/**
* create - Função que cria um evento na base de dados.
*
* @function create
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const create = (parent, args, { events }) => events.create(args.event)
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

/**
* findOne - Função que retorna um evento por id
*
* @function findOne
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const findOne = async (parent, args, { events }) => {
  const event = await events.findOne({
    $or: [
      { _id: args.id },
      { title_key: args.title_key },
    ],
  }).populate('activities');
  return event;
};


/**
 findAll - Função que retorna todos os eventos com os dados indicados
*
* @function findAll
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const findAll = async (parent, args, { events }) => {
  const eventsResponse = await events.find(args.event).populate('activities');
  return eventsResponse;
};

/**
* update - Função que atualiza um evento
*
* @function update
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const update = (parent, args, { events }) => events
  .findOneAndUpdate({ _id: args.event.id }, args.event, { new: true })
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
