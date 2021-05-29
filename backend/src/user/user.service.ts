import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { RepoService } from 'src/repo/repo.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly repoService: RepoService) {}
  async getCountUser(): Promise<string> {
    return `Total books are ${await this.repoService.userRepo.count()}`;
  }
  async getCountRole(): Promise<string> {
    return `Total books are ${await this.repoService.roleRepo.count()}`;
  }
  async createOrUpdate(user: User): Promise<User> {
    return await this.repoService.userRepo.save(user);
  }
}
