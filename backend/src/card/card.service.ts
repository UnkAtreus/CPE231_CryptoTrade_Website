import { Injectable } from '@nestjs/common';
import { CreditCard } from 'src/models/creditcard.model';
import { User } from 'src/models/user.model';
import { RepoService } from 'src/repo/repo.service';

@Injectable()
export class CardService {
  constructor(private readonly repoService: RepoService) {}
  async getUserID(id: number): Promise<User> {
    return await this.repoService.userRepo.findOne(id);
  }
  async createCard(card: CreditCard): Promise<CreditCard> {
    return await this.repoService.creditCardRepo.save(card);
  }
}
