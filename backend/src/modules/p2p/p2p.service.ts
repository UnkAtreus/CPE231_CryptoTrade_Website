import { Injectable } from '@nestjs/common';
import PtoPInput from 'src/models/input/p2p.input';
import { PtoP } from 'src/models/object/ptop.model';
import { User } from 'src/models/object/user.model';
import { RepoService } from 'src/repo/repo.service';
import {
  NotEnoughBalanceInWallet,
  YouCantP2Pyourself,
} from 'src/utils/error-handling';
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
    // let checktaget = input.targetUser;
    // if ((checktaget = user.id)) {
    //   throw YouCantP2Pyourself;
    // } else {
    const p2p = new PtoP();
    const curreny = await this.currencyService.getCurrencyByShortName(
      input.currency,
    );
    const walletFrom = await this.walletService.getWalletByCurrencyId(
      user.id,
      curreny.id,
    );
    if (Number(walletFrom.amount) < input.amount) {
      throw NotEnoughBalanceInWallet;
    }
    const walletTo = await this.walletService.getWalletByCurrencyId(
      input.targetUser,
      curreny.id,
    );
    p2p.amount = String(input.amount);
    p2p.walletFrom = walletFrom;
    p2p.walletTo = walletTo;
    const temp1 = Number(walletFrom.amount) - Number(input.amount);
    const temp2 = Number(walletTo.amount) + Number(input.amount);
    p2p.walletFromBalance = String(temp1);
    p2p.walletToBalance = String(temp2);
    await this.walletService.updateWallet(walletFrom.id, temp1);
    await this.walletService.updateWallet(walletTo.id, temp2);
    return this.repoService.ptopRepo.save(p2p);
    // }
  }

  async getAllP2P(): Promise<PtoP[]> {
    return await this.repoService.ptopRepo.find({
      relations: [
        'walletFrom',
        'walletFrom.currency',
        'walletFrom.user',
        'walletTo',
        'walletTo.currency',
        'walletTo.user',
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }
  async getP2PByToken(user: User): Promise<PtoP[]> {
    const wallet = await this.walletService.getWalletById(user.id);
    return await this.repoService.ptopRepo.find({
      where: { walletFrom: wallet },
      relations: [
        'walletFrom',
        'walletFrom.currency',
        'walletFrom.user',
        'walletTo',
        'walletTo.currency',
        'walletTo.user',
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }
}
