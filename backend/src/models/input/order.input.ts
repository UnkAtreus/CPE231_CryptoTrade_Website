import { Field, InputType } from '@nestjs/graphql';
import { OrderMethod } from 'src/static/enum';

@InputType()
class OrderInput {
  @Field()
  readonly method: OrderMethod;

  @Field()
  readonly currenyIDFrom: string;

  @Field()
  readonly currenyIDTo: string;

  @Field()
  readonly price: number;

  @Field()
  readonly amount: number;
}
export default OrderInput;
