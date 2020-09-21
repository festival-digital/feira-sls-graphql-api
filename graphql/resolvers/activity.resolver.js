import Controller from '../../controllers/activity.controller';

export default {
  queries: {
    oneActivity: Controller.findOne,
    allActivities: Controller.findAll,
  },
  mutations: {
    createActivity: Controller.create,
    updateActivity: Controller.update,
  },
};
