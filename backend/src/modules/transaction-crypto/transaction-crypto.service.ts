import { WalletService } from './../wallet/wallet.service';
import { TransactionFiat } from 'src/models/object/transactionFiat.model';
import { RepoService } from 'src/repo/repo.service';
import { TransactionCrypto } from './../../models/object/transactionCrypto.model';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/models/object/user.model';
import CryptoInput from 'src/models/input/crypto.input';
import { CurrencyService } from '../currency/currency.service';
import { TranasctionMethod, TransactionStatus } from 'src/static/enum';

@Injectable()
export class TransactionCryptoService {
  constructor(
    private readonly repoService: RepoService,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
    private readonly currencyService: CurrencyService,
  ) {}

  async createTransCrypto(
    user: User,
    input: CryptoInput,
  ): Promise<TransactionCrypto> {
    const crypto = new TransactionCrypto();
    const curreny = await this.currencyService.getCurrencyByShortName(
      input.shortName,
    );
    const wallet = await this.walletService.getWalletByCurrencyId(
      user.id,
      curreny.id,
    );

    crypto.user = user;
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
    return this.repoService.transactionCryptoRepo.save(crypto);
  }
  async getCryptoByID(id: number): Promise<TransactionCrypto> {
    return await this.repoService.transactionCryptoRepo.findOne(id);
  }
  async getAllCrypto(): Promise<TransactionCrypto[]> {
    return await this.repoService.transactionCryptoRepo.find();
  }

  async getAllCryptoByUser(user: User): Promise<TransactionCrypto[]> {
    return await this.repoService.transactionCryptoRepo.find({
      where: {
        user: user.id,
      },
    });
  }
  async updateCrypto(
    id: number,
    status: TransactionStatus,
  ): Promise<TransactionCrypto> {
    const crypto = await this.getCryptoByID(id);
    crypto.status = status;
    return await this.repoService.transactionCryptoRepo.save(crypto);
  }
}
