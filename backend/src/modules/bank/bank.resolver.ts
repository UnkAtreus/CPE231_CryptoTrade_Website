import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Bank } from 'src/models/object/bank.model';
import { BankService } from './bank.service';

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
}
