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
  private token!:string;

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

  private async setUser() {
    if (!StartApollo.user && this.token) {
      const { id } = this.decode();
      const user = await User.findOneWithJoins(id);
      StartApollo.user = user;
    }
  }

  private decode():Payload {
    return jwt.verify(this.token, this.jwtSecret) as Payload;
  }

  private async context({ req }: ExpressContext): Promise<IContext> {
    const { headers: { authorization } } = req;
    this.token = authorization as string;
    this.setUser();

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
