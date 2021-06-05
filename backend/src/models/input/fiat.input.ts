import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { TranasctionMethod } from 'src/static/enum';
@InputType()
class FiatInput {
  @Field()
  readonly method?: TranasctionMethod;
  @Field(() => Float)
  readonly amount?: number;
  @Field({ nullable: true })
  readonly bankNumber?: string;
  @Field({ nullable: true })
  readonly bankType?: string;
  @Field(() => ID, { nullable: true })
  readonly creditCard?: number;
}
export default FiatInput;
