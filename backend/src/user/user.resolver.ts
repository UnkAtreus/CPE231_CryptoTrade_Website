import { Inject } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import RegisterInput from "src/models/input/register.input";
import { Role } from "src/models/role.model";
import { User } from "src/models/user.model";
import AllRole from "src/static/role";
import { Repository } from "typeorm";
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}
  @Query(() => [User])
  async getAllUser(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
  @Mutation(() => User)
  async registerUser(
    @Args("registerInput") input: RegisterInput
  ): Promise<User> {
    const userInput = new User();
    const role = new AllRole();
    userInput.firstName = input.profileInput.firstName;
    userInput.lastName = input.profileInput.lastName;
    userInput.role = role.customer;
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
