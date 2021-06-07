import { Injectable } from '@nestjs/common';
import { User } from 'src/models/object/user.model';
import { RepoService } from 'src/repo/repo.service';
import { Verification } from 'src/models/object/verification.model';
import { TransactionStatus } from 'src/static/enum';
import { UserService } from '../user/user.service';

@Injectable()
export class VerificationService {
  constructor(
    private readonly repoService: RepoService,
    private readonly userService: UserService,
  ) {}
  async create(user: User, image: string) {
    const veri: Verification = {
      user: user,
      imageUrl: image,
      status: TransactionStatus.Pending,
    };
    return await this.repoService.veriRepo.save(veri);
  }

  async findAll() {
    return await this.repoService.veriRepo.find({ relations: ['user'] });
  }
  async findOne(id: number) {
    return await this.repoService.veriRepo.findOne({ where: { id: id } });
  }

  async findAllForStaff() {
    return await this.repoService.veriRepo.find({
      where: {
        status: TransactionStatus.Pending,
      },
      relations: ['user'],
      order: {
        created_at: 'ASC',
      },
    });
  }

  async findOneByUser(user: User) {
    return await this.repoService.veriRepo.findOne({
      where: {
        user: user.id,
        status: TransactionStatus.Pending,
      },
      relations: ['user'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async update(
    id: number,
    status: TransactionStatus,
    iduser: number,
  ): Promise<boolean> {
    const veri = await this.findOne(id);
    console.log(iduser);

    veri.status = status;

    return await this.repoService.veriRepo.save(veri).then(async (result) => {
      if (result) {
        if (status == TransactionStatus.Done) {
          return await this.userService.verifyUser(iduser).then((re) => {
            if (!re) return false;
            return true;
          });
        }
      }
    });
  }
}
