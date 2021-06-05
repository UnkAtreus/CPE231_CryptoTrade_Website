import { User } from 'src/models/object/user.model';
import { RepoService } from 'src/repo/repo.service';
import { Injectable } from '@nestjs/common';
import { Bank } from 'src/models/object/bank.model';
import { BankNum } from 'src/models/object/banknum.model';
import { UserService } from '../user/user.service';
import { DeleteResult } from 'typeorm';

@Injectable()
export class BankService {
  constructor(
    private readonly repoService: RepoService,
    private readonly userService: UserService,
  ) {}
  async createBank(): Promise<Bank[]> {
    const bank: string[] = ['KBANK', 'SCB', 'TMB', 'KMA', 'KTB'];
    for (let index = 0; index < bank.length; index++) {
      const createBank = new Bank();
      createBank.bank = bank[index];
      await this.repoService.bankRepo.save(createBank);
    }
    return await this.repoService.bankRepo.find();
  }

  async getBankByName(name: string): Promise<Bank> {
    return await this.repoService.bankRepo.findOne({
      where: { bank: name },
    });
  }

  async getBankByNumAndType(numCard: string, name: number): Promise<BankNum> {
    return await this.repoService.bankNumRepo.findOne({
      where: { bankNumber: numCard, banktype: name },
      relations: ['banktype'],
    });
  }

  async getBankAll(): Promise<Bank[]> {
    return await this.repoService.bankRepo.find();
  }

  async addBankNumber(
    numCard: string,
    name: string,
    user: User,
  ): Promise<BankNum> {
    const numBank = new BankNum();
    const bankType = await this.getBankByName(name);
    numBank.banktype = bankType;
    numBank.user = await this.userService.getUserById(user.id);
    return await this.repoService.bankNumRepo
      .findOne({
        where: {
          user: user.id,
          bankNumber: numCard,
          banktype: bankType,
        },
      })
      .then(async (result) => {
        if (!result) {
          numBank.bankNumber = numCard;
          return await this.repoService.bankNumRepo.save(numBank);
        } else {
          return result;
        }
      });
  }

  async getBankNumAll(): Promise<BankNum[]> {
    return await this.repoService.bankNumRepo.find();
  }

  async getBankNumByToken(user: User): Promise<BankNum[]> {
    return await this.repoService.bankNumRepo.find({
      where: { user: user.id },
      relations: ['banktype', 'user'],
    });
  }

  async deleteBankByID(id: number): Promise<DeleteResult> {
    return await this.repoService.bankNumRepo.delete({ id: id });
  }
}
