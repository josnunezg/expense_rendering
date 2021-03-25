import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import morgan from 'morgan';

import { allResolvers } from './graphql/resolvers';
import { apolloServer, authChecker, registerEnums } from './config';;

const resolvers = allResolvers as any;

async function start(): Promise<express.Application> {
  const app: express.Application = express();
  const server: ApolloServer = await apolloServer(resolvers, authChecker);
  registerEnums();

  app.use(morgan('dev'));
  server.applyMiddleware({ app, path: '/graphql' });

  return app;
}

export default start;
