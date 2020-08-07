import validator from 'validator';
import { sliceArgs } from '../utils/query.utils';
import { validateCPF, extractNumbers } from '../utils/validations.utils';

// /**
// * validateUserToCreate - static function that verify if user is valid
// *
// * @
// * @function validateUserToCreate
// * @param  {object}  parent    it contains the result returned from the resolver
// * on the parent type
// * @returns {object} it's validate response, contain the attributes error and msg.
// */
// const validateUserToCreate = (user) => {
//   if (!validator.isEmail(user.email)) {
//     return ({
//       error: true,
//       msg: JSON.stringify({ msg: 'wrong_email', attribute: 'email' }),
//     });
//   }

//   if (user.cpf) {
//     if (!validateCPF(extractNumbers(user.cpf))) {
//       return ({
//         error: true,
//         msg: JSON.stringify({ msg: 'wrong_cpf', attribute: 'cpf' }),
//       });
//     }
//   }

//   if (validator.isEmpty(user.first_name)) {
//     return ({
//       error: true,
//       msg: JSON.stringify({ msg: 'blank_name', attribute: 'name' }),
//     });
//   }

//   if (validator.isEmpty(user.last_name)) {
//     return ({
//       error: true,
//       msg: JSON.stringify({ msg: 'blank_last_name', attribute: 'last_name' }),
//     });
//   }

//   return { error: false };
// };

/**
* validateUserToUpdate - static function that verify if user is valid
*
* @async
* @function validateUserToUpdate
* @param  {object}  parent    it contains the result returned from the resolver
* on the parent type
* @returns {object} it's validate response, contain the attributes error and msg.
*/
const validateUserToUpdate = (user) => {
  if (user.email && !validator.isEmail(user.email)) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'email is invalid', attribute: 'email' }),
    });
  }

  if (user.cpf && !validateCPF(extractNumbers(user.cpf))) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'cpf is invalid', attribute: 'cpf' }),
    });
  }

  if (user.first_name && validator.isEmpty(user.first_name.trim())) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'name is required', attribute: 'name' }),
    });
  }

  if (user.last_name && validator.isEmpty(user.last_name.trim())) {
    return ({
      error: true,
      msg: JSON.stringify({ msg: 'last_name is required', attribute: 'last_name' }),
    });
  }

  return { error: false };
};

/**
* create - static function that create one user in database.
*
* @function create
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const create = (parent, args, { users }) => users.create(args)
  .then(resp => resp)
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
const findOne = (parent, args, { users }) => {
  const options = sliceArgs(args);

  return users.findOne(options.query)
    .populate('cards')
    .populate('adresses')
    .populate({
      path: 'ads',
      populate: [{ path: 'sneaker' }],
    })
    .populate(({
      path: 'orders',
      populate: [
        { path: 'sneaker' },
        { path: 'ad' },
        { path: 'delivery_address' },
      ],
    }))
    .populate('bankAccounts')
    .populate('tickets.ticket')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
* makeLogin - function that find one user in database, generally using an mongo _id attribute.
*
* @function makeLogin
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const makeLogin = (parent, args, { users }) => {
  const options = sliceArgs(args);

  const now = new Date();

  const toUpdate = {
    last_login: now,
    $push: {
      login_history: now,
    },
  };


  return users.findOneAndUpdate(options.query, toUpdate, { new: true })
    .populate('cards')
    .populate('adresses')
    .populate({
      path: 'ads',
      populate: [{ path: 'sneaker' }],
    })
    .populate(({
      path: 'orders',
      populate: [
        { path: 'sneaker' },
        { path: 'ad' },
        { path: 'delivery_address' },
      ],
    }))
    .populate('bankAccounts')
    .populate('favorites')
    .populate('tickets.ticket')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
 - function that find all users in database, returning all users or some users that
* have some match with indicated attribute.
*
* @function findAll
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const findAll = (parent, args, { users }) => {
  const options = sliceArgs(args);

  return users.find(options.query)
    .populate('cards')
    .populate('adresses')
    .populate({
      path: 'ads',
      populate: [{ path: 'sneaker' }],
    })
    .populate('orders')
    .populate('bankAccounts')
    .populate('favorites')
    .populate('tickets.ticket')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
* search - function that find all users in database, returning all users or some users that
* have some match with indicated attribute.
*
* @function search
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const search = (parent, args, { users }) => {
  const query = {};
  const tags = args.keyWord.trim().split(' ').map(key => new RegExp(key, 'i'));
  if (args.keyWord) {
    query.$or = [
      { first_name: { $in: tags } },
      { last_name: { $in: tags } },
      { email: new RegExp(`^${args.keyWord}`) },
      { cpf: new RegExp(`^${args.keyWord}`) },
      { phone: new RegExp(`^${args.keyWord}`) },
    ];
  }
  return users.find(query)
    .populate('cards')
    .populate('adresses')
    .populate({
      path: 'ads',
      populate: [{ path: 'sneaker' }],
    })
    .populate('orders')
    .populate('bankAccounts')
    .populate('favorites')
    .populate('tickets.ticket')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

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
  const validate = validateUserToUpdate(args);
  if (validate.error) throw new Error(validate.msg);

  return users.findOneAndUpdate({ _id: args._id }, args, { new: true })
    .populate('cards')
    .populate('adresses')
    .populate({
      path: 'ads',
      populate: [{ path: 'sneaker' }],
    })
    .populate('orders')
    .populate('bankAccounts')
    .populate('favorites')
    .populate('tickets.ticket')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
* update - function that update one user in database, generally using an mongo _id attribute.
*
* @function update
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const addCreditCard = (parent, args, { users }) => {
  const validate = validateUserToUpdate(args);
  if (validate.error) throw new Error(validate.msg);

  const toUpdate = { $push: { cards: args.card_id } };

  return users.findOneAndUpdate({ _id: args._id }, toUpdate, { new: true })
    .populate('cards')
    .populate('adresses')
    .populate({
      path: 'ads',
      populate: [{ path: 'sneaker' }],
    })
    .populate('orders')
    .populate('bankAccounts')
    .populate('favorites')
    .populate('tickets.ticket')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
* update - function that update one user in database, generally using an mongo _id attribute.
* init 1569765211285, end 1570197203885
* @function update
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const reportsByDate = async (parent, args, { users }) => {
  const initDate = new Date(+args.initDate);
  const endDate = new Date(+args.endDate);

  const query = args.query ? args.query : {};
  query[args.dateKey] = {
    $gt: new Date(initDate),
    $lt: new Date(endDate),
  };

  const usrs = await users.find(query).count();

  return { count: usrs };
};

/**
* update - function that update one user in database, generally using an mongo _id attribute.
*
* @function update
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const addAddress = (parent, args, { users }) => {
  const validate = validateUserToUpdate(args);
  if (validate.error) throw new Error(validate.msg);

  const toUpdate = { $push: { adresses: args.address_id } };

  return users.findOneAndUpdate({ _id: args._id }, toUpdate, { new: true })
    .populate('cards')
    .populate('adresses')
    .populate({
      path: 'ads',
      populate: [{ path: 'sneaker' }],
    })
    .populate('orders')
    .populate('bankAccounts')
    .populate('favorites')
    .populate('tickets.ticket')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
* addAd - function that add an Ad into user.
*
* @function addAd
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const addAd = (parent, args, { users }) => {
  const validate = validateUserToUpdate(args);
  if (validate.error) throw new Error(validate.msg);

  const toUpdate = { $push: { ads: args.ad_id } };

  return users.findOneAndUpdate({ _id: args._id }, toUpdate, { new: true })
    .populate('cards')
    .populate('adresses')
    .populate({
      path: 'ads',
      populate: [{ path: 'sneaker', options: { sort: { created_at: 1 } } }],
    })
    .populate('orders')
    .populate('bankAccounts')
    .populate('favorites')
    .populate('tickets.ticket')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
* addOrders - function that add Orders into user.
*
* @function addOrders
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const addOrders = (parent, args, { users }) => {
  const validate = validateUserToUpdate(args);
  if (validate.error) throw new Error(validate.msg);

  const toUpdate = { $push: { orders: { $each: args.order_ids } } };

  return users.findOneAndUpdate({ _id: args._id }, toUpdate, { new: true })
    .populate('cards')
    .populate('adresses')
    .populate({
      path: 'ads',
      populate: [{ path: 'sneaker' }],
    })
    .populate('orders')
    .populate('bankAccounts')
    .populate('favorites')
    .populate('tickets.ticket')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
* addPoints - function that add points to user.
*
* @function addPoints
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const addPoints = (parent, args, { users }) => {
  const toUpdate = { $inc: { points: args.points } };

  return users.findOneAndUpdate({ _id: args._id }, toUpdate, { new: true })
    .populate('cards')
    .populate('adresses')
    .populate({
      path: 'ads',
      populate: [{ path: 'sneaker' }],
    })
    .populate('orders')
    .populate('bankAccounts')
    .populate('favorites')
    .populate('tickets.ticket')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
* addBankAccount - function that add an Order into user.
*
* @function addBankAccount
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const addBankAccount = (parent, args, { users }) => {
  const validate = validateUserToUpdate(args);
  if (validate.error) throw new Error(validate.msg);

  const toUpdate = { $push: { bankAccounts: args.bank_account_id } };

  return users.findOneAndUpdate({ _id: args._id }, toUpdate, { new: true })
    .populate('cards')
    .populate('adresses')
    .populate({
      path: 'ads',
      populate: [{ path: 'sneaker' }],
    })
    .populate('orders')
    .populate('bankAccounts')
    .populate('favorites')
    .populate('tickets.ticket')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

/**
* activeTicket - function that add an Order into user.
*
* @function activeTicket
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const activeTicket = async (parent, args, { users, tickets }) => {
  try {
    const now = new Date();
    const ticket = await tickets.findOne({ code: args.ticket_code });

    if (!ticket) throw new Error('ticket/not-found');
    if (now.getTime() < new Date(ticket.initDate).getTime()) throw new Error('ticket/unavailable');
    if (now.getTime() > new Date(ticket.endDate).getTime()) throw new Error('ticket/expired');
    if (ticket.quantity < 1) throw new Error('ticket/sold_out');

    const user = await users.findOne({ _id: args.user_id }).populate('tickets.ticket');

    const ticketInUse = user.tickets.filter(t => (`${t.ticket._id}` === `${ticket._id}`));
    if (ticketInUse) {
      if ((ticketInUse.length >= ticket.qttPerUser)) {
        throw new Error('user/ticket_in_use');
      }
    }
    const updatedUser = await users.findOneAndUpdate(
      { _id: user._id },
      {
        $push: {
          tickets: {
            ticket: ticket._id,
            used: null,
            validated: new Date(),
          },
        },
      },
      { new: true },
    )
      .populate('tickets.ticket');

    const updatedTicket = await tickets.findOneAndUpdate(
      { _id: ticket._id },
      { $inc: { quantity: -1 } },
      { new: true },
    );

    return ({
      ticket: updatedTicket,
      user: updatedUser,
    });
  } catch (err) {
    console.log('err: ', err);
    throw err;
  }
};

/**
* useTicket - function that add an Order into user.
*
* @function useTicket
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const useTicket = async (parent, args, { users }) => {
  try {
    const now = new Date();
    const user = await users.findOne({ _id: args.user_id });

    const myTickets = JSON.parse(JSON.stringify(user.tickets)).map((tck) => {
      if (tck.ticket === args.ticket_id && !tck.used) {
        return ({
          ...tck,
          used: now,
        });
      }
      return tck;
    });

    const updatedUser = await users.findOneAndUpdate(
      { _id: user._id },
      {
        tickets: myTickets,
      },
      { new: true },
    )
      .populate('tickets.ticket');

    return updatedUser;
  } catch (err) {
    throw err;
  }
};

/**
* deleteUser - function that add an Order into user.
*
* @function deleteUser
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const deleteUser = async (parent, args, { deledUsers, users }) => {
  try {
    console.log('args:', args);
    const deletedUser = await users.findOneAndRemove({ _id: args.user_id }, { _id: false });
    console.log('user:', deletedUser.toJSON());
    const user = {
      old_id: args.user_id,
    };
    const keys = Object.keys(deletedUser.toJSON());
    keys.forEach((e) => {
      if (
        e === '_id'
        || e === '__v'
      ) return;
      user[e] = deletedUser[e];
    });

    console.log('\n\n\n\n\n\nfinal user:', user);
    return await deledUsers.create(user);
  } catch (err) {
    throw err;
  }
};

/**
* adminSearch - function that add an Order into user.
*
* @function adminSearch
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const adminSearch = async (parent, args, { users }) => {
  console.log('args: ', args);
  try {
    const user = await users.find({ ...args.user });
    console.log('user: ', user);
    return user;
  } catch (err) {
    console.log('err: ', err);
    throw err;
  }
};

/**
* addFavorite - function that add favorite to user.
*
* @function addFavorite
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const addFavorite = (parent, args, { users }) => {
  const toUpdate = { $push: { favorites: args.sneaker_id } };

  return users.findOneAndUpdate({ _id: args.user_id }, toUpdate, { new: true })
    .populate('cards')
    .populate('adresses')
    .populate({
      path: 'ads',
      populate: [{ path: 'sneaker' }],
    })
    .populate('orders')
    .populate('bankAccounts')
    .populate('favorites')
    .populate('tickets.ticket')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};


/**
* removeFavorite - function that add favorite to user.
*
* @function removeFavorite
* @param {object} parent it contains the result returned from the resolver on the parent type
* @param {object} args it contains filter, sort, skip and limit to build the query
* @param {object} context it contains all mongo collections
*/
const removeFavorite = (parent, args, { users }) => {
  const toUpdate = { $pull: { favorites: args.sneaker_id } };

  return users.findOneAndUpdate({ _id: args.user_id }, toUpdate, { new: true })
    .populate('cards')
    .populate('adresses')
    .populate({
      path: 'ads',
      populate: [{ path: 'sneaker' }],
    })
    .populate('orders')
    .populate('bankAccounts')
    .populate('favorites')
    .populate('tickets.ticket')
    .then(resp => resp)
    .catch((err) => {
      throw new Error(err);
    });
};

export default {
  addOrders,
  create,
  adminSearch,
  findOne,
  search,
  reportsByDate,
  findAll,
  useTicket,
  update,
  addCreditCard,
  addAddress,
  addAd,
  activeTicket,
  addBankAccount,
  addPoints,
  makeLogin,
  addFavorite,
  removeFavorite,
  deleteUser,
};
