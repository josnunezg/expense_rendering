import { Field, ObjectType, ID } from 'type-graphql';

import TransactionableType from './transactionable.type';

@ObjectType()
class BudgetType {
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
}

export default BudgetType;
