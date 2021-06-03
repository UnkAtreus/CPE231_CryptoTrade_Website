import { Injectable } from '@nestjs/common';
import { User } from 'src/models/object/user.model';
import { RepoService } from 'src/repo/repo.service';
import LoginInput from '../../models/input/login.input';
import * as jwt from 'jsonwebtoken';
import RegisterInput from '../../models/input/register.input';
import AllRole from 'src/static/role';
import { IncorrectPassword, UserNotFound } from 'src/utils/error-handling';

import { Hash } from './helper/hash';
import { WalletService } from '../wallet/wallet.service';
import { UpdateResult } from 'typeorm';
import PassInput from 'src/models/input/password.input';
@Injectable()
export class UserService {
  constructor(
    private readonly repoService: RepoService,
    private readonly walletService: WalletService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.repoService.userRepo.find({ relations: ['role'] });
  }
  async createToken({ id, role }: User) {
    const roleName = role.role;
    return jwt.sign({ id, roleName }, 'secret');
  }

  async createOrUpdate(user: User): Promise<User> {
    return await this.repoService.userRepo.save(user);
  }

  async getUserByToken(id: number): Promise<User> {
    return await this.repoService.userRepo.findOne({
      where: { id: id },
      relations: ['role', 'wallet', 'creditCard'],
    });
  }

  async getUserByEmail(input: LoginInput): Promise<User> {
    const user = await this.repoService.userRepo.findOne({
      select: ['id', 'email', 'password'],
      where: { email: input.email },
      relations: ['role'],
    });
    if (!user) {
      throw UserNotFound;
    }
    return user;
  }
  async registerUser(registerInput: RegisterInput): Promise<string> {
    return Hash.encrypt(registerInput.password).then(
      async (password: string) => {
        const user: User = {
          email: registerInput.email,
          password: password,
          ...registerInput.profileInput,
          role: AllRole.customer,
        };
        const result = await this.createOrUpdate(user); // สร้างเสร็จ
        if (result) {
          await this.walletService.createAllWalletForUser(result);
          return await this.createToken(result);
        }
      },
    );
  }

  async loginUser(input: LoginInput): Promise<string> {
    const user = await this.getUserByEmail(input);
    return Hash.compare(input.password, user.password).then(
      async (result: boolean) => {
        if (result) {
          return await this.createToken(user);
        } else {
          throw IncorrectPassword;
        }
      },
    );
  }

  async getUserByID(id: number): Promise<User> {
    return await this.repoService.userRepo.findOne(id);
  }

  async verifyUser(id: number): Promise<UpdateResult> {
    return await this.repoService.userRepo.update({ id }, { verify: true });
  }

  async changePassword(input: PassInput, user: User): Promise<any> {
    const getUser = await this.getUserByID(user.id);
    return Hash.compare(input.oldPass, getUser.password).then(
      async (result: boolean) => {
        if (result) {
          return Hash.encrypt(input.newPass).then(async (password: string) => {
            await this.repoService.userRepo.save({
              id: getUser.id,
              password: password,
            });
          });
        } else {
          throw IncorrectPassword;
        }
      },
    );
  }

  async createPincode(pincode: string, user: User): Promise<User> {
    // return Hash.encrypt(pincode).then(async (pin: string) => {}
    return await this.repoService.userRepo.save({
      id: user.id,
      pinncode: pincode,
    });
  }
}
