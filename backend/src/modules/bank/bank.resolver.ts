import { User } from 'src/models/object/user.model';
import { BankNum } from 'src/models/object/banknum.model';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { Bank } from 'src/models/object/bank.model';
import { BankService } from './bank.service';
import { Roles } from 'src/middleware/guard/roles.decorator';
import { DeleteResult } from 'typeorm';

@Resolver()
export class BankResolver {
  constructor(private readonly bankService: BankService) {}
  @Mutation(() => [Bank])
  async createBank(): Promise<Bank[]> {
    return await this.bankService.createBank();
  }
  @Query(() => Bank)
  async getBankByName(@Args('name') name: string): Promise<Bank> {
    return await this.bankService.getBankByName(name);
  }

  @Query(() => [Bank])
  async getAllBank(): Promise<Bank[]> {
    return await this.bankService.getBankAll();
  }

  @Mutation(() => BankNum)
  @Roles(['customer'])
  async addBankNum(
    @Args('bankNum') bankNum: string,
    @Args('name') name: string,
    @Context('user') user: User,
  ): Promise<BankNum> {
    return await this.bankService.addBankNumber(bankNum, name, user);
  }

  @Query(() => [BankNum])
  async getAllBankNum(): Promise<BankNum[]> {
    return await this.bankService.getBankNumAll();
  }

  @Query(() => [BankNum])
  async getBankNumBytoken(@Context('user') user: User): Promise<BankNum[]> {
    return await this.bankService.getBankNumByToken(user);
  }

  @Mutation(() => BankNum)
  async deleteBank(@Args('id') id: number): Promise<DeleteResult> {
    return this.bankService.deleteBankByID(id);
  }
}
