import {
  Column,
  Entity,
  ManyToOne,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from 'typeorm';

import Transactionable from './transactionable.entity'
import { KindTransaction } from '../interfaces';

@Entity({ name: 'transactions' })
class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column('int')
  amount!: number

  @Column()
  name!: string

  @Column({ type: 'enum', enum: KindTransaction, default: KindTransaction.INCOME })
  kind!: KindTransaction

  @ManyToOne(() => Transactionable, transactionable => transactionable.transactions)
  transactionable!: Transactionable

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: string

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: string

  @BeforeInsert()
  formatAmount() {
    if (this.kind === KindTransaction.EXPENSE) {
      this.amount = this.amount * -1;
    }
  }
}

export default Transaction;
