import {
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn
} from 'typeorm';

import User from './user.entity';
import Report from './report.entity'
import Transactionable from './transactionable.entity';

@Entity({ name: 'budgets' })
class Budget extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => User, user => user.budgets)
  user!: User

  @OneToMany(() => Report, report => report.budget)
  reports?: Report[]

  @OneToOne(() => Transactionable)
  @JoinColumn()
  transactionable!: Transactionable

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: string

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: string
}

export default Budget;
