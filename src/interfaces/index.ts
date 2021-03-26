import User from '../entities/user.entity';
import { Request } from 'express';

export interface IContext {
  user?: User,
  req: Request
}

export enum KindTransaction {
  EXPENSE = 'expense',
  INCOME = 'income'
}

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test'
}
