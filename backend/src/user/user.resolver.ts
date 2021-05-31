import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import RegisterInput from 'src/models/input/register.input';
import { User } from 'src/models/user.model';
import { UserService } from './user.service';
import LoginInput from './../models/input/login.input';
import { Roles } from 'src/middleware/guard/roles.decorator';
import { SetMetadata } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => [User])
  async getAllUser(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => String)
  async login(@Args('login') input: LoginInput): Promise<string> {
    return this.userService.loginUser(input);
  }

  @Mutation(() => String)
  async registerUser(
    @Args('registerInput') input: RegisterInput,
  ): Promise<string> {
    return this.userService.registerUser(input);
  }

  @Query(() => User)
  @Roles(['customer', 'staff', 'owner', 'admin'])
  async getUserByToken(@Context('user') user: User) {
    return this.userService.getUserByToken(user.id);
  }
}
