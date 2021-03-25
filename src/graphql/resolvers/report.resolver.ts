import {
  Resolver,
  Mutation,
  Query,
  ID,
  Arg,
  Authorized
} from 'type-graphql';

import { BudgetType, ReportType } from '../types';
import { ReportInput } from '../inputs';
import Report from '../../entities/report.entity';
import Transactionable from '../../entities/transactionable.entity';
import Budget from '../../entities/budget.entity';

@Resolver()
class ReportResolver {
  @Authorized()
  @Query(() => ReportType)
  async report(@Arg('id', () => ID) id: string | number) {
    return await Report.findOneWithJoins(id);
  }

  @Authorized()
  @Query(() => [ReportType], { nullable: true })
  async reports(@Arg('budgetId', () => ID) budgetId: string | number) {
    const allReports = await Report.findByBudget(budgetId);
    console.log({ allReports });
    return allReports;
  }

  @Authorized()
  @Mutation(() => ReportType)
  async createReport(
    @Arg('values', () => ReportInput) { budgetId, name }: ReportInput
  ) {
    const transactionable = await Transactionable.create().save({ reload: true });
    const budget = await Budget.findOne(budgetId);
    const report = Report.create({ name, transactionable, budget });
    return await report.save();
  }

  @Authorized()
  @Mutation(() => ReportType, { nullable: true })
  async updateReport(
    @Arg('id', () => ID) id: any,
    @Arg('values', () => ReportInput) values: ReportInput
  ) {
    const updated = await Report.update({ id }, values)
    console.log({ updated });
    if (updated) return await Report.findOne(id);
    return null;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async deleteReport(@Arg('id', () => ID) id: number | string) {
    const deleted = await Report.delete(id);
    console.log({ deleted });
    return true
  }
}

export default ReportResolver;
