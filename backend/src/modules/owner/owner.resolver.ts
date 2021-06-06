import { Query, Resolver } from '@nestjs/graphql';
import { TransactionFiat } from 'src/models/object/transactionFiat.model';
import { OwnerService } from './owner.service';

@Resolver()
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @Query(() => [TransactionFiat])
  async getOwnerTranasctionFiat() {
    const x = await this.ownerService.sumFiatFee();
    console.log(x);

    return x;
  }

  @Query(() => [TransactionFiat])
  async getCountOrder() {
    const x = await this.ownerService.countOrder();
    console.log(x);

    return x;
  }
}
