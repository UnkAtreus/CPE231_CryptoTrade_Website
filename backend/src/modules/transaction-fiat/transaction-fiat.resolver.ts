import { Module } from '@nestjs/common';
import { TransactionFiat } from 'src/models/object/transactionFiat.model';
import { TransactionFiatService } from 'src/modules/transaction-fiat/transaction-fiat.service';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import FiatInput from 'src/models/input/fiat.input';
import { User } from 'src/models/object/user.model';

@Resolver()
export class TransactionFiatResolver {
  constructor(private fiatService: TransactionFiatService) {}

  @Query(() => TransactionFiat)
  async createFiat(
    @Context('user') user: User,
    @Args('fiatInput') input: FiatInput,
  ): Promise<TransactionFiat> {
    return this.fiatService.createFiat(input, user);
  }
}
