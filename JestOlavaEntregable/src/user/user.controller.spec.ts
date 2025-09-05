import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';


const mockUserService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll on the service', () => {
    controller.findAll();
    expect(mockUserService.findAll).toHaveBeenCalled();
  });

  it('should call findOne on the service with the correct ID', () => {
    const testId = 1;
    controller.findOne(testId);
    expect(mockUserService.findOne).toHaveBeenCalledWith(testId);
  });
});  
