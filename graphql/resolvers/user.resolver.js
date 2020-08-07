import UserController from '../../controllers/user.controller';

export default {
  queries: {
    user: UserController.findOne,
    allUsers: UserController.findAll,
  },
  mutations: {
    createUser: UserController.create,
    updateUser: UserController.update,
  },
};
