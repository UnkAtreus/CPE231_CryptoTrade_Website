import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { RepoService } from 'src/repo/repo.service';
import { Repository } from 'typeorm';
import LoginInput from './../models/input/login.input';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UserService {
  constructor(private readonly repoService: RepoService) {}
  async createOrUpdate(user: User): Promise<User> {
    return await this.repoService.userRepo.save(user);
  }
  async getAllUsers(): Promise<User[]> {
    return await this.repoService.userRepo.find({ relations: ['role'] });
  }
  async createToken({ id, role }: User) {
    const roleName = role.role;
    return jwt.sign({ id, roleName }, 'secret');
  }

  async getUserByToken(id: number): Promise<User> {
    return await this.repoService.userRepo.findOne({
      where: { id: id },
      relations: ['role'],
    });
  }
  async getUsersByEmailAndPassword(input: LoginInput): Promise<User> {
    return await this.repoService.userRepo.findOne({
      select: ['id', 'email', 'password'],
      where: { email: input.email },
      relations: ['role'],
    });
  }

  async getUserByEmail(input: LoginInput): Promise<string> {
    const user = await this.repoService.userRepo.findOne({
      select: ['id', 'email', 'password'],
      where: { email: input.email },
      relations: ['role'],
    });
    if (!user) {
      return '';
    }
    return await this.createToken(user);
  }
}
