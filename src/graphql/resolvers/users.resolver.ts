import {
  Resolver,
  Mutation,
  Query,
  ID,
  InputType,
  Field,
  Arg,
  Authorized,
  Ctx
} from 'type-graphql';
import { ValidationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import User from '../../entities/user.entity';
import { UserType } from '../types';
import { LoginInput, RegisterInput } from '../inputs';
import { IContext } from '../../interfaces';

const secret = process.env.JWT_SECRET as string;

@Resolver()
class UserResolver {
  @Mutation(() => String)
  async login(@Arg('params', () => LoginInput) { email, password }: LoginInput) {
    const user = await User.findOne({ email });
    if (!user) throw new ValidationError("email or password incorrect");
    if (!user.authorized(password)) throw new ValidationError("email or password incorrect");

    const token = jwt.sign(user.payload(), secret, { expiresIn: '24h' });

    return token;
  }

  @Mutation(() => Boolean)
  async register(@Arg('params', () => RegisterInput) params: RegisterInput) {
    const user = User.create(params);
    await user.save({ reload: true });
    if (!user.hasId()) throw new ValidationError("INVALID USER");

    return true;
  }

  @Authorized()
  @Query(() => UserType)
  currentUser(@Ctx() { user }: IContext) {
    return user;
  }
}

export default UserResolver;
