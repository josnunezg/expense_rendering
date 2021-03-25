import { Field, ID, ObjectType } from 'type-graphql';

import BudgetType from './budget.type';

@ObjectType()
class UserType {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  firstName!: string

  @Field(() => String)
  lastName?: string

  @Field(() => String)
  email!: string

  @Field(() => [BudgetType], { nullable: true})
  budgets?: BudgetType[]

  @Field(() => String)
  createdAt!: string

  @Field(() => String)
  updatedAt!: string
}

export default UserType;
