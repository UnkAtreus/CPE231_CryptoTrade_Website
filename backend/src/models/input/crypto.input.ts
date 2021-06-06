import { Field, Float, InputType } from '@nestjs/graphql';
import { TranasctionMethod } from 'src/static/enum';
@InputType()
class CryptoInput {
  @Field()
  readonly method?: TranasctionMethod;
  @Field(() => Float)
  readonly amount?: number;
  @Field({ nullable: true })
  readonly targetWallet?: string;
  @Field()
  readonly shortName?: string;
}
export default CryptoInput;
