import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { NotebooksModule } from './notebooks/notebooks.module';

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:', 
          entities: [], 
          synchronize: true,
        }),
        UserModule,
        NotebooksModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
