import { RepoService } from 'src/repo/repo.service';
import { TransactionFiat } from 'src/models/object/transactionFiat.model';
import { Injectable } from '@nestjs/common';
import FiatInput from 'src/models/input/fiat.input';
import { TranasctionMethod } from 'src/static/enum';
import e from 'express';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class TransactionFiatService {
  constructor(private readonly RepoService: RepoService,
    private readonly walletService: WalletService){}
  async createFiat(input: FiatInput): Promise<TransactionFiat> {
    const fiat = new TransactionFiat();
    fiat.bankNumber = input.bankNumber;
    fiat.method = input.method;
    fiat.amount = input.amount;
    if (input.method == TranasctionMethod.Deposit) {
        fiat.totalBalance = await this.walletService.{functionName}.findOne({})
    }
    else{

    }
    return await this.RepoService.transactionFiatRepo.save(fiat);
  }
}
