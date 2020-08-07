import user from './user.resolver';

export default {
  Query: {
    ...user.queries,
  },
  Mutation: {
    ...user.mutations,
  },
};
