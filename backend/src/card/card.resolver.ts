import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreditCard } from 'src/models/creditcard.model';
import CardInput from 'src/models/input/card.input';
import { CardService } from 'src/card/card.service';
import { Roles } from 'src/middleware/guard/roles.decorator';
import { User } from 'src/models/user.model';

@Resolver()
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Query(() => User)
  @Roles(['customer', 'staff', 'owner', 'admin'])
  async getUserCByToken(@Context('user') user: User) {
    return user;
  }
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
    const temp = await this.getUserCByToken;
    cardInput.user = temp;

    // cardInput.user = await this.cardService.getUserID(input.userID);

    console.log(temp);
    return this.cardService.createCard(cardInput);
  }
}
