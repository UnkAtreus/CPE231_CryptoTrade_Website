import { Query, Resolver } from '@nestjs/graphql';
import { TransactionFiat } from 'src/models/object/transactionFiat.model';
import { Wallet } from 'src/models/object/wallet.model';
import { OwnerService } from './owner.service';
import GraphQLJSON from 'graphql-type-json';
@Resolver()
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @Query(() => GraphQLJSON)
  async getOwnerTranasctionFiat() {
    const x = await this.ownerService.sumFiatFee();

    return x;
  }

  @Query(() => GraphQLJSON)
  async getCountOrder() {
    const x = await this.ownerService.countOrder();
    return x;
  }
  @Query(() => GraphQLJSON)
  async getCountTransaction() {
    const x = await this.ownerService.countTransaction();
    return x;
  }
  @Query(() => GraphQLJSON)
  async countTopTransaction() {
    const x = await this.ownerService.countTopTransaction();
    return x;
  }
  @Query(() => GraphQLJSON)
  async getMostCurrencyDominate() {
    const x = await this.ownerService.getMostCurrencyDominate();
    return x;
  }
  @Query(() => GraphQLJSON)
  //   async registerCount(@Args('date', { nullable: true }) date?: Date) {
  async registerCount() {
    const x = await this.ownerService.getCountUserRegister();

    return x;
  }
  @Query(() => GraphQLJSON)
  //   async registerCount(@Args('date', { nullable: true }) date?: Date) {
  async countOrderCancel() {
    const x = await this.ownerService.countOrderCancelOrFilled(true);
    // const x = await this.ownerService.countOrderCancelOrFilled(false);
    console.log(x);
    return x;
  }
  @Query(() => GraphQLJSON)
  async getSumFiatFee() {
    const x = await this.ownerService.getSumFiatFee();
    return x;
  }
  @Query(() => GraphQLJSON)
  async getSumCryptoFee() {
    const x = await this.ownerService.getSumCryptoFee();
    return x;
  }

  // @Query(() => GraphQLJSON)
  // async getSumFee() {
  //   const x = await this.ownerService.getSumFee();
  //   return x;
  // }
}
