import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class ReportInput {
  @Field()
  name?: string

  @Field(() => ID)
  budgetId!: string | number
}
