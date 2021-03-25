import {
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  Entity
} from 'typeorm';

import Transaction from './transaction.entity';

@Entity({ name: 'transactionables' })
class Transactionable extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @OneToMany(() => Transaction, transaction => transaction.transactionable)
  transactions?: Transaction[]
}

export default Transactionable;
