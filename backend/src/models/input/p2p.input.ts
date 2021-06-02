import { User } from './../object/user.model';
import { Field, Float, InputType } from '@nestjs/graphql';
import { TranasctionMethod } from 'src/static/enum';
@InputType()
class PtoPInput {
  @Field(() => Float)
  readonly amount?: number;
  @Field()
  readonly targetUser?: number;
  @Field()
  readonly currency?: string;
}
export default PtoPInput;
