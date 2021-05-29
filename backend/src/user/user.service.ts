import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { RepoService } from 'src/repo/repo.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly repoService: RepoService) {}
  async createOrUpdate(user: User): Promise<User> {
    return await this.repoService.userRepo.save(user);
  }
  async getAllUsers(): Promise<User[]> {
    return await this.repoService.userRepo.find();
  }
}
