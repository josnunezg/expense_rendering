import { Field, ObjectType, ID } from 'type-graphql';

import TransactionableType from './transactionable.type';
import BudgetType from './budget.type';

@ObjectType()
class ReportType {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  createdAt!: string

  @Field(() => String)
  updatedAt!: string

  @Field(() => TransactionableType)
  transactionable!: TransactionableType

  @Field(() => BudgetType)
  budget!: BudgetType
}

export default ReportType;
