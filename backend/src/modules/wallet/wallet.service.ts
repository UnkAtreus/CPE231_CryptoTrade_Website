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
    private readonly currencyService: CurrencyService, // private readonly userService: UserService,
  ) {}
  async createAllWalletForUser(user: User): Promise<Wallet[]> {
    const currencyLists = await this.currencyService.getAllCurrency();
    const walletLists: Wallet[] = [];
    currencyLists.forEach(async (currency) => {
      const wallet: Wallet = {
        user: user,
        currency: currency,
        inOrder: '0',
        amount: '0',
      };
      walletLists.push(wallet);
    });
    return await this.repoService.walletRepo.save(walletLists);
  }
  async getAllWallet(): Promise<Wallet[]> {
    return await this.repoService.walletRepo.find();
  }

  async getWalletByCurrencyId(
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

  async getWalletByCurrency(userId: number, currency: string): Promise<Wallet> {
    return await this.currencyService
      .getCurrencyByShortName(currency)
      .then(async (curren) => {
        return await this.repoService.walletRepo.findOne({
          where: {
            user: userId,
            currency: curren.id,
          },
        });
      });
  }
  async getWalletById(id: number): Promise<Wallet> {
    return await this.repoService.walletRepo.findOne(id);
  }

  async getWalletByToken(userId: number): Promise<Wallet[]> {
    return await this.repoService.walletRepo.find({ where: { user: userId } });
  }

  async updateWallet(id: number, amount: number): Promise<Wallet> {
    const wallet = await this.getWalletById(id);
    wallet.amount = String(amount);
    return await this.repoService.walletRepo.save(wallet);
  }

  async Buy(
    walletIDTarget: number,
    walletIDorder: number,
    inOrder: number,
    amount: number,
  ): Promise<Wallet[]> {
    const wallet = await this.getWalletById(walletIDTarget);
    const walletInOrder = await this.getWalletById(walletIDorder);
    wallet.amount = String(Number(wallet.amount) + Number(amount));
    walletInOrder.inOrder = String(
      Number(walletInOrder.inOrder) - Number(amount),
    );
    // wallet.amount += amount;
    // wallet.inOrder -= inOrder;
    return await this.repoService.walletRepo.save([wallet, walletInOrder]);
  }

  async Sell(walletIDFrom: number, amount: number): Promise<Wallet[]> {
    const wallet = await this.getWalletById(walletIDFrom);
    wallet.amount = String(Number(wallet.amount) - Number(amount));
    wallet.inOrder = String(Number(wallet.inOrder) + Number(amount));
    // wallet.amount -= amount;
    // wallet.inOrder += amount;
    return await this.repoService.walletRepo.save([wallet]);
  }

  async cancelOrder(walletIDFrom: number, amount: number): Promise<Wallet[]> {
    const wallet = await this.getWalletById(walletIDFrom);
    wallet.amount = String(Number(wallet.amount) + Number(amount));
    wallet.inOrder = String(Number(wallet.inOrder) - Number(amount));
    return await this.repoService.walletRepo.save([wallet]);
  }
  async playerToPlayer(
    id: number,
    amount: number,
    idTarget: number,
  ): Promise<Wallet[]> {
    const walletFrom = await this.repoService.walletRepo.findOne(id);
    const walletTo = await this.repoService.walletRepo.findOne(idTarget);
    walletFrom.amount = String(Number(walletFrom.amount) - Number(amount));
    walletTo.amount = String(Number(walletTo.inOrder) - Number(amount));
    // walletFrom.amount -= amount;
    // walletTo.amount += amount;
    return await this.repoService.walletRepo.save([walletFrom, walletTo]);
  }
}
