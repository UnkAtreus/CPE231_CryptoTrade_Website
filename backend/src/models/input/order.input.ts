import { Field, ID, InputType, Float } from '@nestjs/graphql';
import { OrderMethod } from 'src/static/enum';

@InputType()
class OrderInput {
  @Field()
  readonly method: OrderMethod;

  @Field(() => ID)
  readonly currenyIDFrom: number;

  @Field(() => ID)
  readonly currenyIDTo: number;

  @Field(() => Float)
  readonly price: number;

  @Field(() => Float)
  readonly amount: number;
}
export default OrderInput;
