import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import RegisterInput from 'src/models/input/register.input';
import { User } from 'src/models/user.model';
import AllRole from 'src/static/role';
import { UserService } from './user.service';
import LoginInput from './../models/input/login.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../middleware/guard/auth.guard';
import { Roles } from 'src/middleware/guard/roles.decorator';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => [User])
  async getAllUser(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => User)
  async login(@Args('login') input: LoginInput): Promise<User> {
    return this.userService.getUsersByEmailAndPassword(input);
  }

  @Query(() => String)
  async login2(@Args('login') input: LoginInput): Promise<string> {
    return this.userService.getUserByEmail(input);
  }

  @Query(() => User)
  @Roles('customer')
  async getUserByToken(@Context('user') user: User) {
    return user;
  }

  @Mutation(() => User)
  async registerUser(
    @Args('registerInput') input: RegisterInput,
  ): Promise<User> {
    const userInput = new User();
    userInput.firstName = input.profileInput.firstName;
    userInput.lastName = input.profileInput.lastName;
    userInput.role = AllRole.customer;
    userInput.email = input.email;
    userInput.nationality = input.profileInput.nationality;
    userInput.citizenID = input.profileInput.citizenID;
    userInput.passportNumber = input.profileInput.passportNumber;
    userInput.phone = input.profileInput.phone;
    userInput.birthDate = input.profileInput.birthDate;
    userInput.gender = input.profileInput.gender;
    userInput.address = input.profileInput.address;
    userInput.city = input.profileInput.city;
    userInput.postcode = input.profileInput.postcode;
    userInput.password = input.password;
    console.log(userInput);
    return this.userService.createOrUpdate(userInput);
  }
}
