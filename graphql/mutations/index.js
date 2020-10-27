
import user from './user.mutation';
import activity from './activity.mutation';
import event from './event.mutation';
import ticket from './ticket.mutation';
import FAQQuestion from './faq-question.mutation';

export default `
  type Mutation {
    ${user}
    ${activity}
    ${event}
    ${ticket}
    ${FAQQuestion}
  }
`;
