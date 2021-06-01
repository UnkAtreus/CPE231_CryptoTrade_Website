import { Module } from '@nestjs/common';
import { TransactionFiat } from 'src/models/object/transactionFiat.model';
import { TransactionFiatService } from 'src/modules/transaction-fiat/transaction-fiat.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import FiatInput from 'src/models/input/fiat.input';

@Resolver()
export class TransactionFiatResolver {
  constructor(private fiatService: TransactionFiatService) {}

  @Query(() => TransactionFiat)
  async createFiat(
    @Args('cardInput') input: FiatInput,
  ): Promise<TransactionFiat> {
    return this.fiatService.createFiat(input);
  }
}
