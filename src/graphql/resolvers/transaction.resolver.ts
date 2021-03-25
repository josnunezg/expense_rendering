import { Mutation, Arg, ID, Resolver, Authorized } from 'type-graphql';

import { TransactionInput } from '../inputs';
import { TransactionType } from '../types';

import Transaction from '../../entities/transaction.entity';
import Transactionable from '../../entities/transactionable.entity';

@Resolver()
class TransactionResolver {
  @Authorized()
  @Mutation(() => TransactionType)
  async createTransaction(
    @Arg('transactionableId', () => ID) transactionableId: number | string,
    @Arg('params', () => TransactionInput) params: TransactionInput
  ) {
    const transactionable = await Transactionable.findOne(transactionableId);
    const transaction = Transaction.create({ ...params, transactionable });
    return await transaction.save();
  }
}

export default TransactionResolver;
