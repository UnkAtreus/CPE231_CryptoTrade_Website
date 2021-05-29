import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/models/role.model';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Role) public readonly roleRepo: Repository<Role>,
  ) {}
}
