import { Field, InputType } from '@nestjs/graphql';
@InputType()
class CardInput {
  @Field(() => String)
  readonly cardNumber?: string;
  @Field(() => String)
  readonly expiredMonth?: string;
  @Field(() => String)
  readonly expiredYear?: string;
  @Field(() => String)
  readonly cvv?: string;
  @Field(() => String, { nullable: true })
  readonly address?: string;
  @Field(() => String, { nullable: true })
  readonly postcode?: string;
  @Field(() => String, { nullable: true })
  readonly city?: string;
  @Field(() => String, { nullable: true })
  readonly country?: string;
}
export default CardInput;
