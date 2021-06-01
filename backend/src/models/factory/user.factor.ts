// import { User } from '../object/user.model';
// import Faker from 'faker';
// import { define } from 'typeorm-seeding';
// import { Gender } from 'src/static/enum';

// define(User, (faker: typeof Faker) => {
//   const firstName = faker.name.firstName();
//   const lastName = faker.name.lastName();
//   const email = faker.internet.exampleEmail(firstName, lastName);
//   const phone = faker.phone.phoneNumber();
//   const nationality = faker.random.word();
//   const birthDate = faker.date.past();
//   const gender = faker.random.objectElement<Gender>();
//   const address = faker.address.streetAddress();
//   const city = faker.random.locale();
//   const postcode = faker.random.word();
//   const password = faker.random.word();

//   const user = new User();
//   user.firstName = firstName;
//   user.lastName = lastName;
//   user.email = email;
//   user.phone = phone;
//   user.nationality = nationality;
//   user.birthDate = birthDate;
//   user.gender = gender;
//   user.address = address;
//   user.city = city;
//   user.postcode = postcode;
//   user.password = password;

//   return user;
// });
