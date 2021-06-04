import { Field, Float, InputType } from '@nestjs/graphql';
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
}
export default FiatInput;
