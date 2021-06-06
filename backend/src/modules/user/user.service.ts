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
import { Between, Raw, UpdateResult } from 'typeorm';
import PassInput from 'src/models/input/password.input';
import { TokenRole } from '../../models/output/tokenrole.model';
import PincodeInput from 'src/models/input/pincode.input';
import { addDays } from 'date-fns';
import { Role } from 'src/models/object/role.model';
@Injectable()
export class UserService {
  constructor(
    private readonly repoService: RepoService,
    private readonly walletService: WalletService,
  ) {}
  async createUser(
    registerInput: RegisterInput,
    role: Role,
  ): Promise<TokenRole> {
    return Hash.encrypt(registerInput.password).then(
      async (password: string) => {
        const user: User = {
          email: registerInput.email,
          password: password,
          ...registerInput.profileInput,
          role: role,
        };
        const result = await this.createOrUpdate(user);
        if (result) {
          if (role.role == AllRole.customer.role) {
            await this.walletService.createAllWalletForUser(result);
          }
          const token = await this.createToken(result);
          const tokenRole: TokenRole = {
            token: token,
            role: user.role.role,
          };
          return tokenRole;
        }
      },
    );
  }
  async getAllUsers(): Promise<User[]> {
    return await this.repoService.userRepo.find({
      relations: ['role', 'wallet', 'wallet.currency'],
    });
  }
  async createToken({ id, role }: User) {
    const roleName = role.role;
    return jwt.sign({ id, roleName }, 'secret');
  }

  async createOrUpdate(user: User): Promise<User> {
    return await this.repoService.userRepo.save(user);
  }

  async getUserById(id: number): Promise<User> {
    return await this.repoService.userRepo.findOne({
      where: { id: id },
      relations: ['role', 'wallet', 'creditCard', 'wallet.currency'],
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
  async registerUser(registerInput: RegisterInput): Promise<TokenRole> {
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
          const token = await this.createToken(result);
          const tokenRole: TokenRole = {
            token: token,
            role: user.role.role,
          };
          return tokenRole;
        }
      },
    );
  }

  async loginUser(input: LoginInput): Promise<TokenRole> {
    const user = await this.getUserByEmail(input);
    return Hash.compare(input.password, user.password).then(
      async (result: boolean) => {
        if (result) {
          const token = await this.createToken(user);
          const tokenRole: TokenRole = {
            token: token,
            role: user.role.role,
          };
          return tokenRole;
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

  async checkPincode(pincode: string, user: User): Promise<boolean> {
    return (
      (await this.repoService.userRepo.count({
        id: user.id,
        pincode: pincode,
      })) == 1
    );
  }
  async createPincode(pincode: string, user: User): Promise<User> {
    return await this.repoService.userRepo.save({
      id: user.id,
      pincode: pincode,
    });
  }

  async upDatePincode(pincode: PincodeInput, user: User): Promise<User> {
    if (pincode.newPin == pincode.oldPin) {
      return await this.repoService.userRepo.save({
        id: user.id,
        pincode: pincode.newPin,
      });
    } else {
      throw IncorrectPassword;
    }
  }
  async getCountUserRegister(date?: Date) {
    date = date ?? new Date();
    const start = date.toISOString().slice(0, 10);
    const end = addDays(date, 1).toISOString().slice(0, 10);

    return await this.repoService.userRepo.count({
      where: {
        created_at: Raw((alias) => `${alias} BETWEEN :start AND :end`, {
          start: start,
          end: end,
        }),
      },
    });
  }
}
