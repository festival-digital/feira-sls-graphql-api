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
