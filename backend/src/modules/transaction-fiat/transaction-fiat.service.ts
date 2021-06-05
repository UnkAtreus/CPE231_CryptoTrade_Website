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
import {
  NotEnoughBalanceInWallet,
  SelectMethod,
} from 'src/utils/error-handling';
import { CreditCard } from 'src/models/object/creditcard.model';
import { CardService } from '../card/card.service';

@Injectable()
export class TransactionFiatService {
  constructor(
    private readonly repoService: RepoService,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
    private readonly currencyService: CurrencyService,
    private readonly cardService: CardService,
    private readonly bankService: BankService,
  ) {}
  async createFiat(input: FiatInput, user: User): Promise<TransactionFiat> {
    const fiat = new TransactionFiat();
    if (!input.bankNumber && !input.cardInput) {
      throw SelectMethod;
    }
    fiat.method = input.method;
    fiat.amount = String(input.amount);
    fiat.status = TransactionStatus.Pending;
    fiat.user = await this.userService.getUserByID(user.id);
    if (input.bankNumber != '') {
      const banktype = await this.bankService.getBankByName(input.bankType);
      fiat.bank = await this.bankService
        .getBankByNumAndType(input.bankNumber, banktype.id)
        .then(async (result) => {
          if (!result) {
            return await this.bankService.addBankNumber(
              input.bankNumber,
              input.bankType,
              user,
            );
          } else {
            return result;
          }
        });
    } else if (input.cardInput.cardNumber != '') {
      fiat.creditCardId = await this.cardService
        .getCardByNum(input.cardInput.cardNumber, user)
        .then(async (result) => {
          if (!result) {
            return await this.cardService.createCard(input.cardInput, user);
          } else {
            return result;
          }
        });
    }
    const currency = await this.currencyService.getCurrencyByShortName('USDT');
    const wallet = await this.walletService.getWalletByCurrencyId(
      user.id,
      currency.id,
    );
    fiat.wallet = wallet;

    const walletAmount = Number(wallet.amount);
    const inputAmount = Number(input.amount);
    let result = 0;

    if (input.method == TranasctionMethod.Deposit) {
      result = walletAmount + inputAmount;
      fiat.status = TransactionStatus.Done;
    } else {
      result = walletAmount - inputAmount;
      fiat.fee = String(inputAmount * 0.001);
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
      relations: ['user', 'bank'],
      order: {
        created_at: 'DESC',
      },
    });
  }
  async countAllFiat(): Promise<number> {
    return await this.repoService.transactionFiatRepo.count({});
  }

  async getAllFiatByUser(user: User): Promise<TransactionFiat[]> {
    return await this.repoService.transactionFiatRepo.find({
      where: {
        user: user.id,
      },
      relations: ['user', 'bank'],
      order: {
        created_at: 'DESC',
      },
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
