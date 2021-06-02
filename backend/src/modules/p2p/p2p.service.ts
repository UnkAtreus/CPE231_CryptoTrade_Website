import { Injectable } from '@nestjs/common';
import PtoPInput from 'src/models/input/p2p.input';
import { PtoP } from 'src/models/object/ptop.model';
import { User } from 'src/models/object/user.model';
import { RepoService } from 'src/repo/repo.service';
import { CurrencyService } from '../currency/currency.service';
import { UserService } from '../user/user.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class P2PService {
  constructor(
    private readonly repoService: RepoService,
    private readonly walletService: WalletService,
    private readonly userService: UserService,
    private readonly currencyService: CurrencyService,
  ) {}

  async createP2P(input: PtoPInput, user: User): Promise<PtoP> {
    const p2p = new PtoP();
    const curreny = await this.currencyService.getCurrencyByShortName(
      input.currency,
    );
    const walletForm = await this.walletService.getWalletByCurrency(
      user.id,
      curreny.id,
    );
    const walletTo = await this.walletService.getWalletByCurrency(
      input.targetUser,
      curreny.id,
    );
    p2p.amount = input.amount;
    p2p.walletFrom = walletForm;
    p2p.walletTo = walletTo;
    const temp1 = Number(walletForm.amount) - Number(input.amount);
    const temp2 = Number(walletTo.amount) + Number(input.amount);
    p2p.walletFromBalance = temp1;
    p2p.walletToBalance = temp2;
    await this.walletService.updateWallet(walletForm.id, temp1);
    await this.walletService.updateWallet(walletTo.id, temp2);
    return this.repoService.ptopRepo.save(p2p);
  }
}
