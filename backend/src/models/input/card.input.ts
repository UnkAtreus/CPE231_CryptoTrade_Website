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
  @Field({ nullable: true })
  readonly address?: string;
  @Field({ nullable: true })
  readonly postcode?: string;
  @Field({ nullable: true })
  readonly city?: string;
  @Field({ nullable: true })
  readonly country?: string;
}
export default CardInput;
