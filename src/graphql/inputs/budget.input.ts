import { InputType, Field } from 'type-graphql';

@InputType()
export class BudgetInput {
  @Field()
  name?: string
}
