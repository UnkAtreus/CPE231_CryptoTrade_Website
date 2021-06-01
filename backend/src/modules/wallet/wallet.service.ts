import { Injectable } from '@nestjs/common';
import { User } from 'src/models/object/user.model';
import { Wallet } from 'src/models/object/wallet.model';
import { RepoService } from 'src/repo/repo.service';
import { CurrencyService } from '../currency/currency.service';
import { UserService } from '../user/user.service';
import { OrderMethod } from 'src/static/enum';

@Injectable()
export class WalletService {
  constructor(
    private readonly repoService: RepoService,
    private readonly currencyService: CurrencyService,
    private readonly userService: UserService,
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
  async getAllWallet(): Promise<Wallet[]> {
    return await this.repoService.walletRepo.find();
  }

  async getWalletByCurrency(
    userId: number,
    currencyId: number,
  ): Promise<Wallet> {
    return await this.repoService.walletRepo.findOne({
      where: {
        user: userId,
        currency: currencyId,
      },
    });
  }
  async getWalletById(id: number): Promise<Wallet> {
    return await this.repoService.walletRepo.findOne(id);
  }

  async getWalletByToken(userId: number): Promise<Wallet[]> {
    return await this.repoService.walletRepo.find({ where: { user: userId } });
  }

  async updateWallet(id: number, amount: number): Promise<Wallet> {
    const wallet = await this.repoService.walletRepo.findOne(id);
    wallet.amount = amount;
    return await this.repoService.walletRepo.save(wallet);
  }

  async Buy(id: number, amount: number): Promise<Wallet[]> {
    const wallet = await this.repoService.walletRepo.findOne(id);
    wallet.amount += amount;
    return await this.repoService.walletRepo.save([wallet]);
  }

  async Sell(id: number, amount: number): Promise<Wallet[]> {
    const wallet = await this.repoService.walletRepo.findOne(id);
    wallet.amount -= amount;
    return await this.repoService.walletRepo.save([wallet]);
  }
  async playerToPlayer(
    id: number,
    amount: number,
    idTarget: number,
  ): Promise<Wallet[]> {
    const walletFrom = await this.repoService.walletRepo.findOne(id);
    const walletTo = await this.repoService.walletRepo.findOne(idTarget);
    walletFrom.amount -= amount;
    walletTo.amount += amount;
    return await this.repoService.walletRepo.save([walletFrom, walletTo]);
  }
}
