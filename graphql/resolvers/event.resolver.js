import Controller from '../../controllers/event.controller';

export default {
  queries: {
    oneEvent: Controller.findOne,
    allEvents: Controller.findAll,
  },
  mutations: {
    createEvent: Controller.create,
    updateEvent: Controller.update,
  },
};
