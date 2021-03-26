import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { buildSchema, AuthChecker } from 'type-graphql';
import jwt from 'jsonwebtoken';

import User from '../entities/user.entity'
import { IContext } from '../interfaces';

interface Payload {
  id?: any
}

class StartApollo {
  private jwtSecret:string = process.env.JWT_SECRET as string;
  private static user: User | undefined;
  private resolvers:any;

  constructor(resolvers:any) {
    this.resolvers = resolvers;
  }

  public async server(): Promise<ApolloServer> {
    return new ApolloServer({
      schema: await this.buildSchema(),
      context: this.context
    });
  }

  private async buildSchema() {
    return await buildSchema({
      resolvers: this.resolvers,
      authChecker: this.authChecker,
      validate: false
    })
  }

  private decode(token: string):Payload {
    return jwt.verify(token, this.jwtSecret) as Payload;
  }

  private async context({ req }: ExpressContext): Promise<IContext> {
    const { headers: { authorization } } = req;
    if (!StartApollo.user && authorization) {
      const { id } = this.decode(authorization as string);
      const user = await User.findOneWithJoins(id);
      StartApollo.user = user;
    }

    return {
      req,
      user: StartApollo.user
    }
  }

  private authChecker:AuthChecker<IContext> = ({ context: { user } }, _roles) => {
    return !!user;
  }
}

export default StartApollo;
