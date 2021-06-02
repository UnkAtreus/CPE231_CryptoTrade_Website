// import { Role } from 'src/models/object/role.model';
// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class role1622658398491 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<any> {
//     const roleRepo = queryRunner.connection.getRepository(Role);
//     await roleRepo.insert([
//       {
//         role: 'customer',
//       },
//       {
//         role: 'staff',
//       },
//       {
//         role: 'owner',
//       },
//       {
//         role: 'manager',
//       },
//     ]);
//   }
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   public async down(queryRunner: QueryRunner): Promise<any> {}
// }
