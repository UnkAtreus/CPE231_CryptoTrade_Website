import { Field, Float, InputType } from '@nestjs/graphql';
import { TranasctionMethod } from 'src/static/enum';
@InputType()
class PassInput {
  @Field()
  readonly oldPass?: string;
  @Field()
  readonly newPass?: string;
}
export default PassInput;
