import { Field, ObjectType, ID, Int } from 'type-graphql';

import { KindTransaction } from '../../interfaces';

@ObjectType()
class TransactionType {
  @Field(() => ID)
  id!: number

  @Field()
  name!: string

  @Field(() => Int)
  amount!: number

  @Field()
  kind!: string
}

export default TransactionType;
