import { UserInputError } from 'apollo-server-lambda';
import Sympla from '../services/sympla.service';
import { validateUser } from '../validations/user.validator';

/**
* create - Função que cria um usuário no banco de dados
*
* @function create
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const create = async (parent, args, { users }) => {
  let user;
  try {
    validateUser(args.user);
  } catch (err) {
    const [, error, attribute] = err.message.split('/');
    throw new UserInputError(`Validation error, ${error} value in ${attribute} key`, {
      invalidArgs: [attribute],
    });
  }

  try {
    user = await users.create(args.user);
  } catch (err) {
    const duplicatedKeys = Object.keys(err.keyPattern);
    if (duplicatedKeys) {
      throw new UserInputError(`Duplicated in [${duplicatedKeys.toString()}] keys`, {
        invalidArgs: duplicatedKeys,
      });
    }
    throw new Error(err);
  }

  return user;
};

/**
* findOne - Função que acha um usuário por id, e-mail ou cpf.
*
* @function findOne
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const findOne = (parent, args, { users }) => users.findOne({
  $or: [
    { _id: args.id },
    { ida: args.ida },
    { email: args.email },
    { cpf: args.cpf },
  ],
})
  .populate('tickets')
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });


/**
 findAll - Função que acha retorna usuários com as informações indicadas
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
* update - Função que atualiza o usuário
*
* @function update
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const update = (parent, args, { users }) => users
  .findOneAndUpdate({ _id: args.user.id }, args.user, { new: true })
  .populate('tickets')
  .then(resp => resp)
  .catch((err) => {
    throw new Error(err);
  });

/**
* addTicket - Função que adiciona um ticket à um usuário, fazendo a consulta no sympla e
*   adicionando ele a nossa base de dados
*
* @function addTicket
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const addTicket = async (parent, args, {
  users, tickets, events, SYMPLA_KEY,
}) => {
  const { code, user_id, sympla_event_id } = args;
  let sTicket;
  let ticket;
  const sympla = new Sympla(SYMPLA_KEY);

  try {
    sTicket = await sympla.getTicket({ event_id: sympla_event_id, ticket_number: code });
  } catch (err) {
    const [type, error, attribute] = err.message.split('/');
    throw new UserInputError(`${type} error, ${error} to get ${attribute}`, {
      invalidArgs: [attribute],
    });
  }

  const event = await events.findOne({ sympla_id: sympla_event_id });
  try {
    ticket = await tickets.create({
      ...sympla.mapTicket(sTicket),
      user: user_id,
      event: event._id,
    });
  } catch (err) {
    const duplicatedKeys = Object.keys(err.keyPattern);
    if (duplicatedKeys) {
      throw new UserInputError(`Duplicated in [${duplicatedKeys.toString()}] keys`, {
        invalidArgs: duplicatedKeys,
      });
    }
    throw err;
  }

  await users.findOneAndUpdate({ _id: user_id }, { $push: { tickets: ticket._id } });

  return ({ ...ticket.toJSON(), id: ticket._id });
};

export default {
  create,
  addTicket,
  findOne,
  findAll,
  update,
};
