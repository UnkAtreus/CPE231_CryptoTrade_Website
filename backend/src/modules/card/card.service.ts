import { Injectable } from '@nestjs/common';
import { CreditCard } from 'src/models/object/creditcard.model';
import { User } from 'src/models/object/user.model';
import { RepoService } from 'src/repo/repo.service';
import { UserService } from 'src/modules/user/user.service';
import CardInput from '../../models/input/card.input';
import { DeleteResult } from 'typeorm';
import e from 'express';

@Injectable()
export class CardService {
  constructor(
    private readonly repoService: RepoService,
    private readonly userService: UserService,
  ) {}
  async createCard(input: CardInput, user: User): Promise<CreditCard> {
    return await this.repoService.creditCardRepo
      .findOne({
        where: {
          cardNumber: input.cardNumber,
          cvv: input.cvv,
          expiredMonth: input.expiredMonth,
          expiredYear: input.expiredYear,
          user: user.id,
        },
      })
      .then(async (result) => {
        if (!result) {
          const card: CreditCard = {
            ...input,
            user: await this.userService.getUserById(user.id),
          };
          return await this.repoService.creditCardRepo.save(card);
        } else {
          return result;
        }
      });
  }

  async getAllCard(): Promise<CreditCard[]> {
    return await this.repoService.creditCardRepo.find({
      relations: ['user'],
    });
  }

  async getCardByNum(num: string, user: User): Promise<CreditCard> {
    return await this.repoService.creditCardRepo.findOne({
      where: { cardNumber: num, user: user.id },
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
    card.cardNumber = input.cardNumber ?? card.cardNumber;
    card.cvv = input.cvv ?? card.cvv;
    card.expiredMonth = input.expiredMonth ?? card.expiredMonth;
    card.expiredYear = input.expiredYear ?? card.expiredYear;
    return await this.repoService.creditCardRepo.save(card);
  }

  async deleteCardByID(id: number): Promise<DeleteResult> {
    return await this.repoService.creditCardRepo.delete({ id: id });
  }
}
