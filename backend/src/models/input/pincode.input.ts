import { Field, Float, InputType } from '@nestjs/graphql';
import { TranasctionMethod } from 'src/static/enum';
@InputType()
class PincodeInput {
  @Field()
  readonly oldPin?: string;
  @Field()
  readonly newPin?: string;
}
export default PincodeInput;
