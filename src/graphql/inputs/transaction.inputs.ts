import { InputType, Field, ID, Int, registerEnumType } from 'type-graphql';

import { KindTransaction } from '../../interfaces';

registerEnumType(KindTransaction, {
  name: 'KindTransaction',
  description: 'kind of transaction'
})
@InputType()
export class TransactionInput {
  @Field()
  name!: string

  @Field(() => Int)
  amount!: number

  @Field(type => KindTransaction)
  kind!: KindTransaction
}
