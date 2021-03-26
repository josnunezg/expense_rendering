import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import morgan from 'morgan';

import { allResolvers } from './graphql/resolvers';
import { StartApollo, TypeORMConnection } from './config';
import { Environment } from './interfaces';

const resolvers = allResolvers as any;

class App {
  private static environment:string = process.env.NODE_ENV as string;
  private db: TypeORMConnection;
  private app: express.Application;
  private apollo: StartApollo;
  private port = process.env.PORT;

  constructor() {
    this.db = new TypeORMConnection(App.isProduction());
    this.app = express();
    this.apollo = new StartApollo(resolvers);
  }

  public async start() {
    await this.connectDB();
    const server = await this.apolloServer();

    this.app.use(morgan('dev'));
    server.applyMiddleware({ app: this.app, path: '/graphql' });
    this.app.listen(this.port, function() {
      console.log('Server Listening');
    });
  }

  private async connectDB() {
    await this.db.connect();
  }

  private static isProduction():boolean {
    return this.environment === Environment.PRODUCTION;
  }

  private async apolloServer(): Promise<ApolloServer> {
    return await this.apollo.server();
  }
}

export default App;
