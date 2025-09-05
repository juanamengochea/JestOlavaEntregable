import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
 
  it('should return all users', () => {
    const users = service.findAll();
    expect(users.length).toBe(2);
    expect(users[0].name).toBe('Alice');
  });

  it('should return a user by ID', () => {
    const user = service.findOne(1);
    expect(user.name).toBe('Alice');
  });

  it('should throw NotFoundException for invalid ID', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });
});