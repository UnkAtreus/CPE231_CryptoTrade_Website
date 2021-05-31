import { Injectable } from '@nestjs/common';
import { CreditCard } from 'src/models/object/creditcard.model';
import { User } from 'src/models/object/user.model';
import { RepoService } from 'src/repo/repo.service';
import { UserService } from 'src/modules/user/user.service';
import CardInput from '../../models/input/card.input';

@Injectable()
export class CardService {
  constructor(
    private readonly repoService: RepoService,
    private readonly userService: UserService,
  ) {}
  async getUserID(id: number): Promise<User> {
    return await this.repoService.userRepo.findOne(id);
  }
  async createCard(input: CardInput, user: User): Promise<CreditCard> {
    const card: CreditCard = {
      ...input,
      user: await this.userService.getUserByToken(user.id),
    };
    // card.user = await this.userService.getUserByToken(user.id);
    return await this.repoService.creditCardRepo.save(card);
  }
}
