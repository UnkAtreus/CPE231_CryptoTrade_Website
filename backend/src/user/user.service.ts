import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { RepoService } from 'src/repo/repo.service';
import LoginInput from './../models/input/login.input';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import RegisterInput from './../models/input/register.input';
import AllRole from 'src/static/role';
import { IncorrectPassword, UserNotFound } from 'src/utils/error-handling';
import { lstat } from 'node:fs';
@Injectable()
export class UserService {
  constructor(private readonly repoService: RepoService) {}

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
      relations: ['role'],
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
    return bcrypt
      .hash(registerInput.password, 1)
      .then(async (password: string) => {
        const user: User = {
          email: registerInput.email,
          password: password,
          ...registerInput.profileInput,
          role: AllRole.customer,
        };
        const result = await this.createOrUpdate(user); // สร้างเสร็จ
        if (result) return await this.createToken(result); // GEN TOKEN
      });
  }

  async loginUser(input: LoginInput): Promise<string> {
    const user = await this.getUserByEmail(input);

    return bcrypt
      .compare(input.password, user.password)
      .then(async (result: boolean) => {
        if (result) {
          return await this.createToken(user);
        } else {
          throw IncorrectPassword;
        }
      });
  }
}
