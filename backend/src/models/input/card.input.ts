import { Field, InputType } from '@nestjs/graphql';
import { User } from '../user.model';

@InputType()
class CardInput {
  @Field()
  readonly cardNumber: string;
  @Field()
  readonly expiredMonth: string;
  @Field()
  readonly expiredYear: string;
  @Field()
  readonly cvv: string;
  @Field()
  readonly address: string;
  @Field()
  readonly postcode: string;
  @Field()
  readonly city: string;
  @Field()
  readonly country: string;
  @Field()
  readonly userID: number;
}
export default CardInput;
