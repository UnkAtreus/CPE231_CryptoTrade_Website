import { Field, InputType } from '@nestjs/graphql';

@InputType()
class LoginInput {
  @Field()
  readonly email?: string;

  @Field()
  readonly password?: string;
}
export default LoginInput;
