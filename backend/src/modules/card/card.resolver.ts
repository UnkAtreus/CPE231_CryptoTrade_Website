import { DeleteResult } from 'typeorm';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreditCard } from 'src/models/object/creditcard.model';
import { CardService } from 'src/modules/card/card.service';
import { User } from 'src/models/object/user.model';
import CardInput from 'src/models/input/card.input';
import { Roles } from 'src/middleware/guard/roles.decorator';
import { number } from 'yargs';

@Resolver()
export class CardResolver {
  constructor(private cardService: CardService) {}

  @Query(() => [CreditCard])
  async getAllCard(): Promise<CreditCard[]> {
    return this.cardService.getAllCard();
  }

  @Query(() => CreditCard)
  async getCardByID(@Args('idcardInput') input: number): Promise<CreditCard> {
    return this.cardService.getCardByID(input);
  }

  @Query(() => [CreditCard])
  @Roles(['customer'])
  async getCardByToken(@Context('user') user: User){
    return this.cardService.getCardByToken(user.id);
  }

  @Mutation(() => CreditCard)
  @Roles(['customer'])
  async addCard(
    @Context('user') user: User,
    @Args('cardInput') input: CardInput,
  ): Promise<CreditCard> {
    return this.cardService.createCard(input, user);
  }

  @Mutation(() => CreditCard)
  async updateCard(
    @Args('id') id: number,
    @Args('cardInput') input: CardInput,
  ): Promise<CreditCard> {
    return this.cardService.updateCardByID(id, input);
  }

  @Mutation(() => CreditCard)
  async deleteCard(@Args('id') id: number): Promise<DeleteResult> {
    return this.cardService.deleteCardByID(id);
  }

}