import { CurrencyService } from './../currency/currency.service';
import { User } from 'src/models/object/user.model';
import { UserService } from 'src/modules/user/user.service';
import { RepoService } from 'src/repo/repo.service';
import { TransactionFiat } from 'src/models/object/transactionFiat.model';
import { Injectable } from '@nestjs/common';
import FiatInput from 'src/models/input/fiat.input';
import { TranasctionMethod, TransactionStatus } from 'src/static/enum';
import { WalletService } from '../wallet/wallet.service';
import { BankService } from '../bank/bank.service';
import { NotEnoughBalanceInWallet } from 'src/utils/error-handling';

@Injectable()
export class TransactionFiatService {
  constructor(
    private readonly repoService: RepoService,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
    private readonly currencyService: CurrencyService,
    private readonly bankService: BankService,
  ) {}
  async createFiat(input: FiatInput, user: User): Promise<TransactionFiat> {
    const fiat = new TransactionFiat();
    fiat.bankNumber = input.bankNumber;
    fiat.method = input.method;
    fiat.amount = String(input.amount);
    fiat.status = TransactionStatus.Pending;
    fiat.user = user;
    const getbank = await this.bankService.getBankByName(input.bankType);
    const curreny = await this.currencyService.getCurrencyByShortName('USDT');
    const wallet = await this.walletService.getWalletByCurrencyId(
      user.id,
      curreny.id,
    );
    fiat.wallet = wallet;
    fiat.bank = getbank;

    console.log(wallet);
    const temp1 = Number(wallet.amount);
    const temp2 = Number(input.amount);
    let result = 0;

    if (input.method == TranasctionMethod.Deposit) {
      result = temp1 + temp2;
    } else {
      result = temp1 - temp2;
      fiat.fee = String(temp2 * 0.001);
      if (result < 0) {
        throw NotEnoughBalanceInWallet;
      }
    }
    fiat.totalBalanceLeft = String(result);
    await this.walletService.updateWallet(wallet.id, result);
    return await this.repoService.transactionFiatRepo.save(fiat);
  }

  async getFiatByID(id: number): Promise<TransactionFiat> {
    return await this.repoService.transactionFiatRepo.findOne(id);
  }
  async getAllFiat(): Promise<TransactionFiat[]> {
    return await this.repoService.transactionFiatRepo.find({
      relations: ['user'],
    });
  }

  async getAllFiatByUser(user: User): Promise<TransactionFiat[]> {
    return await this.repoService.transactionFiatRepo.find({
      where: {
        user: user.id,
      },
      relations: ['user'],
    });
  }
  async updateFiat(
    id: number,
    status: TransactionStatus,
  ): Promise<TransactionFiat> {
    const fiat = await this.getFiatByID(id);
    fiat.status = status;
    return await this.repoService.transactionFiatRepo.save(fiat);
  }
}
