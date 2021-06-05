import { Field, ID, InputType, Float } from '@nestjs/graphql';
import { OrderMethod, OrderType } from 'src/static/enum';

@InputType()
class OrderInput {
  @Field()
  readonly method: OrderMethod;

  @Field()
  readonly currencyFrom: string;

  @Field()
  readonly currencyTo: string;

  @Field(() => Float)
  readonly price: number;

  @Field(() => Float)
  readonly amount: number;

  @Field()
  readonly type: OrderType;
}
export default OrderInput;
