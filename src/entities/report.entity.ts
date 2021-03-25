import {
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';

import Budget from './budget.entity';
import Transactionable from './transactionable.entity';

@Entity({ name: 'reports' })
class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Budget, budget => budget.reports)
  budget!: Budget

  @OneToOne(() => Transactionable)
  @JoinColumn()
  transactionable!: Transactionable

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: string

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: string

  // entity methods
  static async findByBudget(budgetId: string | number): Promise<Report[]> {
    return await this.createQueryBuilder('report')
                     .leftJoinAndSelect('report.transactionable', 'transactionable')
                     .leftJoinAndSelect('transactionable.transactions', 'transactions')
                     .leftJoin('report.budget', 'budget')
                     .where('budget.id = :budgetId', { budgetId })
                     .getMany();
  }

  static async findOneWithJoins(id: string | number): Promise<Report | undefined> {
    return await this.createQueryBuilder('report')
                     .leftJoinAndSelect('report.transactionable', 'transactionable')
                     .leftJoinAndSelect('transactionable.transactions', 'transactions')
                     .where('report.id = :id', { id })
                     .getOne();
  }
}

export default Report;
