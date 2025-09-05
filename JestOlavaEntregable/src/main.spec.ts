import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import './main';


jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn(() => ({
      listen: jest.fn(),
    })),
  },
}));

describe('Main', () => {
  it('should call NestFactory.create with AppModule and listen on port', async () => {
  
    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
  });
});