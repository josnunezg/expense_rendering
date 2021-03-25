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
