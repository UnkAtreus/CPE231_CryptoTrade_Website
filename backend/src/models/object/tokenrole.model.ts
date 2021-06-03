import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenRole {
  @Field()
  token?: string;
  @Field()
  role?: string;
}
