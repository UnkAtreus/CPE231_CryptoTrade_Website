import { Field, InputType } from '@nestjs/graphql';
@InputType()
class CardInput {
  @Field()
  readonly cardNumber?: string;
  @Field()
  readonly expiredMonth?: string;
  @Field()
  readonly expiredYear?: string;
  @Field()
  readonly cvv?: string;
  @Field()
  readonly cardName?: string;
}
export default CardInput;
