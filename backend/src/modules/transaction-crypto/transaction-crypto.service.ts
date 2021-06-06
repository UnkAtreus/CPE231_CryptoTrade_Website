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
import {
  NotEnoughBalanceInWallet,
  UserIsNotVerify,
} from 'src/utils/error-handling';

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

    const getuser = await this.userService.getUserByID(user.id);
    crypto.user = await this.userService.getUserByID(user.id);
    crypto.method = input.method;
    crypto.amount = input.amount;
    crypto.targetWallet = input.targetWallet;
    crypto.status = TransactionStatus.Pending;

    const temp1 = Number(wallet.amount);
    const temp2 = Number(input.amount);
    let result = 0;

    if (input.method == TranasctionMethod.Deposit) {
      result = temp1 + temp2;
      crypto.status = TransactionStatus.Done;
    } else {
      result = temp1 - temp2;
      crypto.fee = temp2 * 0.001;
      if (getuser.verify == false) {
        console.log('Do this');
        throw UserIsNotVerify;
      }
      if (result < 0) {
        throw NotEnoughBalanceInWallet;
      }
    }
    crypto.totalBalanceLeft = result;
    crypto.wallet = await this.walletService.updateWallet(wallet.id, result);
    return this.repoService.transactionCryptoRepo.save(crypto);
  }
  async getCryptoByID(id: number): Promise<TransactionCrypto> {
    return await this.repoService.transactionCryptoRepo.findOne(id);
  }
  async getAllCrypto(): Promise<TransactionCrypto[]> {
    return await this.repoService.transactionCryptoRepo.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async getAllCryptoByUser(user: User): Promise<TransactionCrypto[]> {
    return await this.repoService.transactionCryptoRepo.find({
      where: {
        user: user.id,
      },
      order: {
        created_at: 'DESC',
      },
      relations: ['wallet', 'wallet.currency', 'user'],
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
