import Controller from '../../controllers/votes.controller';

export default {
  queries: {},
  mutations: {
    vote: Controller.vote,
    unvote: Controller.unvote,
  },
};
