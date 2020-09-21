import user from './user.query';
import activity from './activity.query';
import event from './event.query';
import ticket from './ticket.query';

export default `
  type Query {
    ${user}
    ${activity}
    ${event}
    ${ticket}
  }
`;
