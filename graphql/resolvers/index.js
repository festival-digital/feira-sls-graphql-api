import user from './user.resolver';
import activity from './activity.resolver';
import event from './event.resolver';
import ticket from './ticket.resolver';
import FAQQuestion from './faq-question.resolver';
import show from './show.resolver';
import vote from './vote.resolver';

export default {
  Query: {
    ...user.queries,
    ...activity.queries,
    ...event.queries,
    ...ticket.queries,
  },
  Mutation: {
    ...user.mutations,
    ...activity.mutations,
    ...event.mutations,
    ...ticket.mutations,
    ...FAQQuestion.mutations,
    ...vote.mutations,
    ...show.mutations,
  },
};
