import { ApolloServer, makeExecutableSchema } from 'apollo-server-lambda';
import dotenv from 'dotenv';
import schema from './graphql/schema';
import MongoDB from './db/Mongodb';

dotenv.config();
let conn = null;

const server = new ApolloServer(
  {
    schema: makeExecutableSchema(schema),
    introspection: true,
    playground: true,
    path: '/graphql',
    context: async ({ event, context }) => {
      const envVariables = event.stageVariables || {
        mongoUrl: process.env.mongoUrl,
      };

      const connConfig = { conn };
      if (envVariables.mongoUrl) connConfig.mongoUrl = `mongodb+${envVariables.mongoUrl}`;

      conn = await MongoDB(connConfig);

      return ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
        // connection
        users: conn.model('users'),
        deledUsers: conn.model('deleted-users'),
        phones: conn.model('phones'),
        adresses: conn.model('adresses'),
        sneakers: conn.model('sneakers_30-07-2020'),
        errors: conn.model('errors'),
        cards: conn.model('cards'),
        adComplaints: conn.model('adComplaints'),
        ads: conn.model('ads'),
        orders: conn.model('orders'),
        bankAccounts: conn.model('bankAccounts'),
        multiOrders: conn.model('multiOrders'),
        offers: conn.model('offers'),
        configurations: conn.model('configurations'),
        payments: conn.model('payments'),
        transactions: conn.model('transactions'),
        comments: conn.model('comments'),
        banks: conn.model('banks'),
        tickets: conn.model('tickets'),
        countries: conn.model('countries'),
        newsletterUsers: conn.model('newsletter-users'),
      });
    },
  },
);

const graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
  tracing: true,
});
export { graphqlHandler };
export default graphqlHandler;
