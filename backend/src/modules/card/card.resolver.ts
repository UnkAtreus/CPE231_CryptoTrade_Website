import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CreditCard } from 'src/models/creditcard.model';
import { CardService } from 'src/modules/card/card.service';
import { Query } from '@nestjs/common';
import { User } from 'src/models/user.model';
import CardInput from 'src/models/input/card.input';
import { Roles } from 'src/middleware/guard/roles.decorator';

@Resolver()
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Mutation(() => CreditCard)
  @Roles(['customer'])
  async addCard(
    @Context('user') user: User,
    @Args('cardInput') input: CardInput,
  ): Promise<CreditCard> {
    return this.cardService.createCard(input, user);
  }
}
