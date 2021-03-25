import {
  Resolver,
  Mutation,
  Query,
  ID,
  InputType,
  Field,
  Arg,
  Authorized,
  Ctx
} from 'type-graphql';

import { BudgetType } from '../types';
import { BudgetInput } from '../inputs';
import Budget from '../../entities/budget.entity';
import Transactionable from '../../entities/transactionable.entity';
import { IContext } from '../../interfaces';

@Resolver()
class BudgetResolver {
  @Authorized()
  @Query(() => BudgetType)
  async budget(@Arg('id', () => ID) id: string | number) {
    return await Budget.findOne(id);
  }

  @Authorized()
  @Query(() => [BudgetType], { nullable: true })
  async budgets(@Ctx() { user }: IContext) {
    return user?.budgets || [];
  }

  @Authorized()
  @Mutation(() => BudgetType)
  async createBudget(
    @Arg('values', () => BudgetInput) values: BudgetInput,
    @Ctx() { user }: IContext
  ) {
    const transactionable = await Transactionable.create().save({ reload: true });
    const budget = Budget.create({ ...values, user, transactionable });
    return await budget.save();
  }

  @Authorized()
  @Mutation(() => BudgetType, { nullable: true })
  async updateBudget(
    @Arg('id', () => ID) id: any,
    @Arg('values', () => BudgetInput) values: BudgetInput
  ) {
    const updated = await Budget.update({ id }, values)
    console.log({ updated });
    if (updated) return await Budget.findOne(id);
    return null;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteBudget(@Arg('id', () => ID) id: number | string) {
    const deleted = await Budget.delete(id);
    console.log({ deleted });
    return true
  }
}

export default BudgetResolver;
