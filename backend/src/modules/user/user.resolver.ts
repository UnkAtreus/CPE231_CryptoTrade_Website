import PincodeInput from 'src/models/input/pincode.input';
import PassInput from 'src/models/input/password.input';
import { Args, Context, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import RegisterInput, { ProfileInput } from 'src/models/input/register.input';
import { User } from 'src/models/object/user.model';
import { UserService } from './user.service';
import LoginInput from '../../models/input/login.input';
import { Roles } from 'src/middleware/guard/roles.decorator';
import { Gender } from 'src/static/enum';
import faker from 'faker';
import { Role } from 'src/models/object/role.model';
import { TokenRole } from 'src/models/output/tokenrole.model';
import { DeleteResult } from 'typeorm';
@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => [User])
  async getAllUser(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Query(() => TokenRole)
  async login(@Args('login') input: LoginInput): Promise<TokenRole> {
    return this.userService.loginUser(input);
  }

  @Mutation(() => TokenRole)
  async createUser(
    @Args('registerInput') input: RegisterInput,
    @Args('role', { type: () => Number }) role: number,
  ): Promise<any> {
    return this.userService.createUser(input, role);
  }
  @Mutation(() => TokenRole)
  async registerUser(
    @Args('registerInput') input: RegisterInput,
  ): Promise<any> {
    return this.userService.registerUser(input);
  }
  @Mutation(() => User)
  async updateUser(
    @Args('profile') input: ProfileInput,
    @Args('id', { type: () => ID }) id: number,
  ): Promise<any> {
    return this.userService.createOrUpdate(input, id);
  }

  @Query(() => User)
  async getUserById(@Args('id', { type: () => ID }) id: number) {
    return this.userService.getUserById(id);
  }
  @Query(() => User)
  @Roles(['customer', 'staff', 'owner', 'admin'])
  async getUserByToken(@Context('user') user: User) {
    return this.userService.getUserById(user.id);
  }

  @Mutation(() => String)
  async verifyUser(@Args('idInput') input: number) {
    await this.userService.verifyUser(input);
    return 'verify';
  }

  @Mutation(() => String)
  @Roles(['customer'])
  async changePassword(
    @Args('passInput') input: PassInput,
    @Context('user') user: User,
  ) {
    const d = this.userService.changePassword(input, user);
    if (d) {
      return true;
    } else {
      return false;
    }
  }

  @Mutation(() => User)
  @Roles(['customer'])
  async createPincode(
    @Args('input') input: string,
    @Context('user') user: User,
  ) {
    return this.userService.createPincode(input, user);
  }

  @Mutation(() => User)
  @Roles(['customer'])
  async updatePincode(
    @Args('input') input: PincodeInput,
    @Context('user') user: User,
  ) {
    return this.userService.upDatePincode(input, user);
  }

  @Query(() => Boolean)
  @Roles(['customer'])
  async checkPin(
    @Context('user') user: User,
    @Args('pin') input: string,
  ): Promise<boolean> {
    return await this.userService.checkPincode(input, user);
  }

  @Mutation(() => User)
  async deleteUserByID(@Args('id') id: number): Promise<DeleteResult> {
    return this.userService.deleteUserByID(id);
  }
}
