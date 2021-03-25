import PingResolver from './ping.resolver';
import BudgetResolver from './budget.resolver';
import UserResolver from './users.resolver';
import TransactionResolver from './transaction.resolver';
import ReportResolver from './report.resolver';

export const allResolvers = [
  PingResolver,
  BudgetResolver,
  UserResolver,
  TransactionResolver,
  ReportResolver
]
