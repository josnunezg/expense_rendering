import { ApolloServer } from 'apollo-server-express';
import { buildSchema, AuthChecker } from 'type-graphql';
import jwt from 'jsonwebtoken';

import User from '../entities/user.entity'
import { IContext } from '../interfaces';

const secret = process.env.JWT_SECRET as string;
let user: User | undefined = undefined;

async function getUser(id: string | number): Promise<User | undefined> {
  return await User.findOneWithJoins(id);
}

async function startApollo(resolvers: any, authChecker: AuthChecker<IContext>): Promise<ApolloServer> {
  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      authChecker,
      validate: false
    }),
    context: async ({ req }): Promise<IContext> => {
      const { headers: { authorization } } = req;
      if (authorization) {
        if (!user) {
          const { id } = jwt.verify(authorization as string, secret) as any;
          user = await getUser(id);
        }
      }
      return { req, user };
    }
  });

  return apollo;
}

export default startApollo;
