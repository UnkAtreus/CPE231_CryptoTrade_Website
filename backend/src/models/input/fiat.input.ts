import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { TranasctionMethod } from 'src/static/enum';
import CardInput from './card.input';
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
  @Field({ nullable: true })
  readonly cardInput?: CardInput;
}
export default FiatInput;
