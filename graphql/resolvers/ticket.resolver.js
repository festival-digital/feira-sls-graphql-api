import Controller from '../../controllers/ticket.controller';

export default {
  queries: {
    oneTicket: Controller.findOne,
    allTickets: Controller.findAll,
  },
  mutations: {
    createTicket: Controller.create,
    updateTicket: Controller.update,
  },
};
