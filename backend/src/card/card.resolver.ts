import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreditCard } from 'src/models/creditcard.model';
import CardInput from 'src/models/input/card.input';
import { CardService } from 'src/card/card.service';
import { Query } from '@nestjs/common';

@Resolver()
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Mutation(() => CreditCard)
  async addCard(@Args('cardInput') input: CardInput): Promise<CreditCard> {
    const cardInput = new CreditCard();
    cardInput.cardNumber = input.cardNumber;
    cardInput.expiredMonth = input.expiredMonth;
    cardInput.expiredYear = input.expiredYear;
    cardInput.cvv = input.cvv;
    cardInput.address = input.address;
    cardInput.postCode = input.postcode;
    cardInput.city = input.city;
    cardInput.country = input.country;
    cardInput.user = await this.cardService.getUserID(input.userID);

    console.log(cardInput);
    return this.cardService.createCard(cardInput);
  }
}
