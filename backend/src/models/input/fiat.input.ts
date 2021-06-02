import { Field, Float, InputType } from '@nestjs/graphql';
import { TranasctionMethod } from 'src/static/enum';
@InputType()
class FiatInput {
  @Field()
  readonly method?: TranasctionMethod;
  @Field(() => Float)
  readonly amount?: number;
  @Field()
  readonly bankNumber?: string;
}
export default FiatInput;
