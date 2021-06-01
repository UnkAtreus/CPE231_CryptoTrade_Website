import { Field, InputType } from '@nestjs/graphql';
import { TranasctionMethod } from 'src/static/enum';
@InputType()
class FiatInput {
  @Field()
  readonly method?: TranasctionMethod;
  @Field()
  readonly amount?: number;
  @Field()
  readonly bankNumber?: string;
  @Field()
  readonly totalBalance?: number;
}
export default FiatInput;
