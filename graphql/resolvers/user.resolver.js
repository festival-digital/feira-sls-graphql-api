import Controller from '../../controllers/user.controller';

export default {
  queries: {
    oneUser: Controller.findOne,
    allUsers: Controller.findAll,
  },
  mutations: {
    createUser: Controller.create,
    updateUser: Controller.update,
    addTicketIntoUser: Controller.addTicket,
  },
};
