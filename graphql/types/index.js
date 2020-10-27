import userType from './user.type';
import activityType from './activity.type';
import eventType from './event.type';
import ticketType from './ticket.type';
import faqQuestionType from './faq-question.type';

export default `
  scalar JSON
  
  ${userType}
  ${activityType}
  ${eventType}
  ${ticketType}
  ${faqQuestionType}
`;
