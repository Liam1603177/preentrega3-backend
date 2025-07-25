import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const generateMockUsers = (count = 1) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('coder123', 10),
      role: faker.helpers.arrayElement(['user', 'admin']),
      pets: [],
    });
  }
  return users;
};

export default generateMockUsers;
