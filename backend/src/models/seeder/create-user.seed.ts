import { User } from '../object/user.model';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUser implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)().createMany(20);
  }
}
