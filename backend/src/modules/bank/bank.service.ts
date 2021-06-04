import { RepoService } from 'src/repo/repo.service';
import { Injectable } from '@nestjs/common';
import { Bank } from 'src/models/object/bank.model';

@Injectable()
export class BankService {
  constructor(private readonly repoService: RepoService) {}
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
    return await this.repoService.bankRepo.findOne({ where: { bank: name } });
  }

  async getBankAll(): Promise<Bank[]> {
    return await this.repoService.bankRepo.find();
  }
}
