import { Injectable } from '@nestjs/common';
import { CreditCard } from 'src/models/object/creditcard.model';
import { User } from 'src/models/object/user.model';
import { RepoService } from 'src/repo/repo.service';
import { UserService } from 'src/modules/user/user.service';
import CardInput from '../../models/input/card.input';
import { DeleteResult } from 'typeorm';

@Injectable()
export class CardService {
  constructor(
    private readonly repoService: RepoService,
    private readonly userService: UserService,
  ) {}
  async createCard(input: CardInput, user: User): Promise<CreditCard> {
    const card: CreditCard = {
      ...input,
      user: await this.userService.getUserByToken(user.id),
    };
    return await this.repoService.creditCardRepo.save(card);
  }

  async getAllCard(): Promise<CreditCard[]> {
    return await this.repoService.creditCardRepo.find({
      relations: ['user'],
    });
  }

  async getCardByID(id: number): Promise<CreditCard> {
    return await this.repoService.creditCardRepo.findOne({
      where: { id: id },
      relations: ['user'],
    });
  }

  async getCardByToken(id: number): Promise<CreditCard[]> {
    return await this.repoService.creditCardRepo.find({
      where: { user: id },
      relations: ['user'],
    });
  }

  async updateCardByID(id: number, input: CardInput): Promise<CreditCard> {
    // const card: CreditCard = {
    //   id: id,
    //   ...input,
    // };
    const card = await this.repoService.creditCardRepo.findOne(id);
    card.cardNumber = input.cardNumber;
    card.cvv = input.cvv;
    card.expiredMonth = input.expiredMonth;
    card.expiredYear = input.expiredYear;
    card.address = input.address;
    card.city = input.city;
    card.country = input.country;
    card.postCode = input.postcode;
    return await this.repoService.creditCardRepo.save(card);
  }

  async deleteCardByID(id: number): Promise<DeleteResult> {
    return await this.repoService.creditCardRepo.delete({ id: id });
  }
}
