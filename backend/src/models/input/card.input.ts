import { Field, InputType } from '@nestjs/graphql';
@InputType()
class CardInput {
  @Field()
  readonly cardNumber?: string;
  @Field({ nullable: true })
  readonly expiredMonth?: string;
  @Field({ nullable: true })
  readonly expiredYear?: string;
  @Field({ nullable: true })
  readonly cvv?: string;
  @Field({ nullable: true })
  readonly cardName?: string;
}
export default CardInput;
