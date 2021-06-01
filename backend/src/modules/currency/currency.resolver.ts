import { Args, Mutation, Resolver, Query, ID, Context } from '@nestjs/graphql';
import { Roles } from 'src/middleware/guard/roles.decorator';
import { Currency } from 'src/models/object/currency.model';
import { CurrencyService } from '../currency/currency.service';
import { DeleteResult } from 'typeorm';
import { User } from 'src/models/object/user.model';

@Resolver()
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Mutation(() => Currency)
  // @Roles(['admin'])
  async createCurrency(
    @Args('currencyName') currencyName: string,
    @Args('currencyShortName') currencyShortName: string,
  ): Promise<Currency> {
    return await this.currencyService.createCurrency(
      currencyName,
      currencyShortName,
    );
  }

  @Mutation(() => [Currency])
  async createAllCurrency(): Promise<Currency[]> {
    return await this.currencyService.createAllCurrency();
  }

  @Mutation(() => String)
  async deleteCurrency(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<DeleteResult> {
    return await this.currencyService.deleteCurrency(id);
  }

  @Mutation(() => Currency)
  async updateCurrency(
    @Args('id', { type: () => ID }) id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('shortName', { nullable: true }) shortName?: string,
    @Args('volume', { nullable: true }) volume?: number,
  ): Promise<Currency> {
    return await this.currencyService.updateCurrency(
      id,
      name,
      shortName,
      volume,
    );
  }

  @Query(() => [Currency])
  async getAllCurrency(): Promise<Currency[]> {
    return await this.currencyService.getAllCurrency();
  }

  @Query(() => Currency)
  async getCurrencyId(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Currency> {
    return await this.currencyService.getCurrencyByID(id);
  }

  @Query(() => Currency)
  async getCurrencyByShortName(
    @Context('user') user: User,
    @Args('shortName') shortName: string,
  ): Promise<Currency> {
    return await this.currencyService.getCurrencyByShortName(shortName);
  }
}
