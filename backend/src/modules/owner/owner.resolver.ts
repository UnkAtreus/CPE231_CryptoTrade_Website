import { Query, Resolver } from '@nestjs/graphql';
import { TransactionFiat } from 'src/models/object/transactionFiat.model';
import { Wallet } from 'src/models/object/wallet.model';
import { OwnerService } from './owner.service';

@Resolver()
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @Query(() => [TransactionFiat])
  async getOwnerTranasctionFiat() {
    const x = await this.ownerService.sumFiatFee();
    //     console.log(x);

    return x;
  }

  @Query(() => [TransactionFiat])
  async getCountOrder() {
    const x = await this.ownerService.countOrder();
    //     console.log(x);

    return x;
  }
  @Query(() => [TransactionFiat])
  async getCountTransaction() {
    const x = await this.ownerService.countTransaction();
    //     console.log(x);
    //
    return x;
  }
  @Query(() => [TransactionFiat])
  async countTopTransaction() {
    const x = await this.ownerService.countTopTransaction();
    //     console.log(x);

    return x;
  }
  @Query(() => [Wallet])
  async getMostCurrencyDominate() {
    //     console.log('ssssss');

    const x = await this.ownerService.getMostCurrencyDominate();
    //     console.log(x);

    return x;
  }
  //   @Query(() => [Wallet])
  //   async getCountUserRegister() {
  //     console.log('ssssss');

  //     const x = await this.ownerService.getCountUserRegister();
  //     console.log(x);

  //     return x;
  //   }
  @Query(() => [Wallet])
  //   async registerCount(@Args('date', { nullable: true }) date?: Date) {
  async registerCount() {
    const x = await this.ownerService.getCountUserRegister();
    //     console.log(x);

    return x;
  }
  @Query(() => [Wallet])
  //   async registerCount(@Args('date', { nullable: true }) date?: Date) {
  async countOrderCancel() {
    const x = await this.ownerService.countOrderCancel();
    console.log(x);
    return x;
  }
}
