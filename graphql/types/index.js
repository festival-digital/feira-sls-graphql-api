import userType from './user.type';
import activityType from './activity.type';
import eventType from './event.type';
import ticketType from './ticket.type';
import faqQuestionType from './faq-question.type';
import show from './show.type';
import vote from './vote.type';

export default `
  scalar JSON
  
  ${userType}
  ${activityType}
  ${eventType}
  ${ticketType}
  ${faqQuestionType}
  ${show}
  ${vote}
`;
