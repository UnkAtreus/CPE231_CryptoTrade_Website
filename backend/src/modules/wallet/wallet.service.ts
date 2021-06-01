import { Injectable } from '@nestjs/common';
import { User } from 'src/models/object/user.model';
import { Wallet } from 'src/models/object/wallet.model';
import { RepoService } from 'src/repo/repo.service';
import { CurrencyService } from '../currency/currency.service';

@Injectable()
export class WalletService {
  constructor(
    private readonly repoService: RepoService,
    private readonly currencyService: CurrencyService,
  ) {}
  async createAllWalletForUser(user: User): Promise<Wallet[]> {
    const currencyLists = await this.currencyService.getAllCurrency();
    const walletLists: Wallet[] = [];
    currencyLists.forEach(async (currency) => {
      const wallet: Wallet = {
        user: user,
        currency: currency,
        amount: 0,
      };
      walletLists.push(wallet);
    });
    return await this.repoService.walletRepo.save(walletLists);
  }
}
