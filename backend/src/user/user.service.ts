import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { RepoService } from 'src/repo/repo.service';
import { Repository } from 'typeorm';
import LoginInput from './../models/input/login.input';

@Injectable()
export class UserService {
  constructor(private readonly repoService: RepoService) {}
  async createOrUpdate(user: User): Promise<User> {
    return await this.repoService.userRepo.save(user);
  }
  async getAllUsers(): Promise<User[]> {
    return await this.repoService.userRepo.find({ relations: ['role'] });
  }
  async getUsersByEmailAndPassword(input: LoginInput): Promise<User> {
    // User user = await this.repoService.userRepo.find({select: ['email', 'password'], where:{email:input.email}});

    return await this.repoService.userRepo.findOne({
      select: ['id', 'email', 'password'],
      where: { email: input.email },
      relations: ['role'],
    });
  }
}
