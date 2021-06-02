import { WalletService } from './../wallet/wallet.service';
import { TransactionFiat } from 'src/models/object/transactionFiat.model';
import { RepoService } from 'src/repo/repo.service';
import { TransactionCrypto } from './../../models/object/transactionCrypto.model';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/models/object/user.model';
import CryptoInput from 'src/models/input/crypto.input';
import { CurrencyService } from '../currency/currency.service';
import { TranasctionMethod } from 'src/static/enum';

@Injectable()
export class TransactionCryptoService {
  constructor(
    private readonly RepoService: RepoService,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
    private readonly currencyService: CurrencyService,
  ) {}

  async createTransCrypto(
    user: User,
    input: CryptoInput,
  ): Promise<TransactionCrypto> {
    const crypto = new TransactionCrypto();
    const getuser = await this.userService.getUserByToken(user.id);
    const curreny = await this.currencyService.getCurrencyByShortName(
      input.shortName,
    );
    const wallet = await this.walletService.getWalletByCurrency(
      user.id,
      curreny.id,
    );

    crypto.user = getuser;
    crypto.method = input.method;
    crypto.amount = input.amount;
    crypto.targetWallet = input.targetWallet;
    crypto.wallet = wallet;

    const temp1 = Number(wallet.amount);
    const temp2 = Number(input.amount);

    if (input.method == TranasctionMethod.Deposit) {
      crypto.totalBalanceLeft = temp1 + temp2;
    } else {
      crypto.totalBalanceLeft = temp1 - temp2;
    }
    await this.walletService.updateWallet(wallet.id, crypto.totalBalanceLeft);
    return this.RepoService.transactionCryptoRepo.save(crypto);
  }
}
