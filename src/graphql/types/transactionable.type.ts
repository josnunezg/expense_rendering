import { ObjectType, Field, ID } from 'type-graphql';

import TransactionType from './transaction.type';

@ObjectType()
class TransactionableType {
  @Field(() => ID)
  id!: number

  @Field(() => [TransactionType], { defaultValue: [], nullable: true })
  transactions?: TransactionType[]
}

export default TransactionableType;
