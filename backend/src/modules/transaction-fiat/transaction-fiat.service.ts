import { CurrencyService } from './../currency/currency.service';
import { User } from 'src/models/object/user.model';
import { UserService } from 'src/modules/user/user.service';
import { RepoService } from 'src/repo/repo.service';
import { TransactionFiat } from 'src/models/object/transactionFiat.model';
import { Injectable } from '@nestjs/common';
import FiatInput from 'src/models/input/fiat.input';
import { TranasctionMethod } from 'src/static/enum';
import e from 'express';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class TransactionFiatService {
  constructor(
    private readonly RepoService: RepoService,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
    private readonly currencyService: CurrencyService,
  ) {}
  async createFiat(input: FiatInput, user: User): Promise<TransactionFiat> {
    const fiat = new TransactionFiat();
    fiat.bankNumber = input.bankNumber;
    fiat.method = input.method;
    fiat.amount = input.amount;

    const getuser = await this.userService.getUserByToken(user.id);
    fiat.user = getuser;
    const curreny = await this.currencyService.getCurrencyByShortName('USDT');
    const balance = await this.walletService.getWalletByCurrency(
      user.id,
      curreny.id,
    );
    const temp1 = Number(balance.amount);
    const temp2 = Number(fiat.amount);

    if (input.method == TranasctionMethod.Deposit) {
      fiat.totalBalance = temp1 + temp2;
      await this.walletService.updateWallet(balance.id, fiat.totalBalance);
    } else {
      fiat.totalBalance = temp1 - temp2;
      await this.walletService.updateWallet(balance.id, fiat.totalBalance);
    }
    return await this.RepoService.transactionFiatRepo.save(fiat);
    return;
  }
}
