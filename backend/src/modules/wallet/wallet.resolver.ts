import { Args, Context, Query, Resolver, ID, Mutation } from '@nestjs/graphql';
import { Roles } from 'src/middleware/guard/roles.decorator';
import { User } from 'src/models/object/user.model';
import { Wallet } from 'src/models/object/wallet.model';
import { WalletService } from '../wallet/wallet.service';

@Resolver()
export class WalletResolver {
  constructor(private walletService: WalletService) {}

  @Query(() => [Wallet])
  async getAllWallet(): Promise<Wallet[]> {
    return await this.walletService.getAllWallet();
  }

  @Query(() => [Wallet])
  @Roles(['customer'])
  async getUserWalletByToken(@Context('user') user: User): Promise<Wallet[]> {
    return await this.walletService.getWalletByToken(user.id);
  }

  @Query(() => Wallet)
  async getWalletById(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Wallet> {
    return await this.walletService.getWalletById(id);
  }
}
