import PassInput from 'src/models/input/password.input';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import RegisterInput from 'src/models/input/register.input';
import { User } from 'src/models/object/user.model';
import { UserService } from './user.service';
import LoginInput from '../../models/input/login.input';
import { Roles } from 'src/middleware/guard/roles.decorator';
import { Gender } from 'src/static/enum';
import faker from 'faker';
import { TokenRole } from 'src/models/object/tokenrole.model';
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
  // @Mutation(() => String)
  async registerUser(
    @Args('registerInput') input: RegisterInput,
  ): Promise<any> {
    return this.userService.registerUser(input);
  }

  @Query(() => User)
  @Roles(['customer', 'staff', 'owner', 'admin'])
  async getUserByToken(@Context('user') user: User) {
    return this.userService.getUserByToken(user.id);
  }

  @Mutation(() => String)
  async verifyUser(@Args('idInput') input: number): Promise<string> {
    this.userService.verifyUser(input);
    return 'verify';
  }

  @Mutation(() => String)
  @Roles(['customer'])
  async changePassword(
    @Args('passInput') input: PassInput,
    @Context('user') user: User,
  ): Promise<string> {
    return this.userService.changePassword(input, user);
  }

  // @Mutation(() => String)
  // async seedUser() {
  //   for (let i = 0; i < 20; i++) {
  //     const firstName = faker.name.firstName();
  //     const lastName = faker.name.lastName();
  //     const email = faker.internet.email();
  //     const phone = '0000000000';
  //     const nationality = faker.random.word();
  //     const birthDate = faker.date.past();
  //     const gender = Gender.Female;
  //     const address = faker.address.streetAddress();
  //     const city = faker.random.locale();
  //     const postcode = '10140';
  //     const password = faker.random.word();
  //     const input: RegisterInput = {
  //       email: email,
  //       password: password,
  //       profileInput: {
  //         firstName: firstName,
  //         lastName: lastName,
  //         phone: phone,
  //         nationality: nationality,
  //         birthDate: birthDate,
  //         gender: gender,
  //         address: address,
  //         city: city,
  //         postcode: postcode,
  //         citizenID: '12345678910',
  //       },
  //     };
  //     console.log(input);

  //     await this.userService.registerUser(input);
  //   }
  //   return '';
  // }
}
