import { BankService } from './../bank/bank.service';
import { Roles } from './../../middleware/guard/roles.decorator';
import { Module } from '@nestjs/common';
import { TransactionFiat } from 'src/models/object/transactionFiat.model';
import { TransactionFiatService } from 'src/modules/transaction-fiat/transaction-fiat.service';
import { Args, Context, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import FiatInput from 'src/models/input/fiat.input';
import { User } from 'src/models/object/user.model';
import { TransactionStatus } from 'src/static/enum';

@Resolver()
export class TransactionFiatResolver {
  constructor(
    private fiatService: TransactionFiatService,
    private bankService: BankService,
  ) {}

  @Mutation(() => TransactionFiat)
  @Roles(['customer'])
  async createFiat(
    @Context('user') user: User,
    @Args('fiatInput') input: FiatInput,
  ): Promise<TransactionFiat> {
    return this.fiatService.createFiat(input, user);
  }
  @Query(() => [TransactionFiat])
  async getAllFiat(): Promise<TransactionFiat[]> {
    return await this.fiatService.getAllFiat();
  }
  @Query(() => [TransactionFiat])
  @Roles(['customer'])
  async getAllFiatByUser(
    @Context('user') user: User,
  ): Promise<TransactionFiat[]> {
    return await this.fiatService.getAllFiatByUser(user);
  }
  @Mutation(() => TransactionFiat)
  @Roles(['staff'])
  async updateFiatStatus(
    @Args('status') status: TransactionStatus,
    @Args('id', { type: () => ID }) id: number,
  ): Promise<TransactionFiat> {
    return this.fiatService.updateFiat(id, status);
  }
}
