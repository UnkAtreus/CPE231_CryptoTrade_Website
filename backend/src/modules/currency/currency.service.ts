import { Injectable } from '@nestjs/common';
import { Currency } from 'src/models/object/currency.model';
import { RepoService } from 'src/repo/repo.service';
import { DeleteResult, Not, In } from 'typeorm';

@Injectable()
export class CurrencyService {
  constructor(private readonly repoService: RepoService) {}
  async createCurrency(currencyName: string, currencyShortName: string) {
    const currency: Currency = {
      currencyLongName: currencyName,
      currency: currencyShortName,
      volume: '0',
    };
    return await this.repoService.currencyRepo.save(currency);
  }
  async createAllCurrency(): Promise<Currency[]> {
    const currencyNames: string[] = [
      'Bitcoin',
      'Cardano',
      'Ethereum',
      'Bitcoin Cash',
      'Polkadot',
      'US Dollar',
      'Thai Baht',
    ];
    const currencyShortNames: string[] = [
      'BTC',
      'ADA',
      'ETH',
      'BCH',
      'DOT',
      'USDT',
      'THB',
    ];
    for (let index = 0; index < currencyNames.length; index++) {
      const currency: Currency = {
        currencyLongName: currencyNames[index],
        currency: currencyShortNames[index],
        volume: '0',
      };
      await this.repoService.currencyRepo.save(currency);
    }
    return await this.repoService.currencyRepo.find();
  }

  async updateCurrency(
    id?: number,
    name?: string,
    shortName?: string,
    volume?: string,
  ): Promise<Currency> {
    const currency = await this.repoService.currencyRepo.findOne(id);
    currency.currencyLongName = name ?? currency.currencyLongName;
    currency.currency = shortName ?? currency.currency;
    currency.volume = volume ?? currency.volume;
    return await this.repoService.currencyRepo.save(currency);
  }

  async getAllCurrency(): Promise<Currency[]> {
    return await this.repoService.currencyRepo.find();
  }

  async getCurrencyByID(id: number): Promise<Currency> {
    return await this.repoService.currencyRepo.findOne(id);
  }

  async deleteCurrency(id: number): Promise<DeleteResult> {
    return await this.repoService.currencyRepo.delete(id);
  }

  async getCurrencyByShortName(shortName: string): Promise<Currency> {
    return await this.repoService.currencyRepo.findOne({
      where: {
        currency: shortName,
      },
    });
  }
  async getAllCurrencyNoStatic(): Promise<Currency[]> {
    return await this.repoService.currencyRepo.find({
      where: [
        {
          currency: Not(In(['USDT', 'THB'])),
        },
      ],
    });
  }
}
