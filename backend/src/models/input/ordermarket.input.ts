import { Field, ID, InputType, Float } from '@nestjs/graphql';
import { OrderMethod } from 'src/static/enum';

@InputType()
class OrderMarketInput {
  @Field()
  readonly method: OrderMethod;

  @Field()
  readonly currencyFrom: string;

  @Field()
  readonly currencyTo: string;

  @Field(() => Float)
  readonly amount: number;
}
export default OrderMarketInput;
