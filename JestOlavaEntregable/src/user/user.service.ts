import { Injectable, NotFoundException } from '@nestjs/common';

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

@Injectable()
export class UserService {
  findAll() {
    return users;
  }

  findOne(id: number) {
    const user = users.find(user => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    return user;
  }
}