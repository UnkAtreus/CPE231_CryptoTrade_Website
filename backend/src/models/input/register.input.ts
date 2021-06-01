import { Field, InputType } from '@nestjs/graphql';
import { Gender } from 'src/static/enum';

@InputType()
class ProfileInput {
  @Field()
  readonly firstName?: string;
  @Field()
  readonly lastName?: string;
  @Field()
  readonly phone?: string;
  @Field()
  readonly nationality?: string;
  @Field({ nullable: true })
  readonly citizenID: string;
  @Field({ nullable: true })
  readonly passportNumber?: string;
  @Field()
  readonly birthDate?: Date;
  @Field()
  readonly gender?: Gender;
  @Field()
  readonly address?: string;
  @Field()
  readonly city?: string;
  @Field()
  readonly postcode?: string;
}
@InputType()
class RegisterInput {
  @Field()
  readonly email: string;

  @Field()
  readonly password: string;

  @Field()
  readonly profileInput: ProfileInput;
}
export default RegisterInput;
