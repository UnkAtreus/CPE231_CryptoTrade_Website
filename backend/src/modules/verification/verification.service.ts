import { Injectable } from '@nestjs/common';
import { CreateVerificationInput } from './dto/create-verification.input';
import { UpdateVerificationInput } from './dto/update-verification.input';

@Injectable()
export class VerificationService {
  create(createVerificationInput: CreateVerificationInput) {
    return 'This action adds a new verification';
  }

  findAll() {
    return `This action returns all verification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} verification`;
  }

  update(id: number, updateVerificationInput: UpdateVerificationInput) {
    return `This action updates a #${id} verification`;
  }

  remove(id: number) {
    return `This action removes a #${id} verification`;
  }
}
