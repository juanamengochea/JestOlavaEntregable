import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'; 
import { NotebooksModule } from './notebooks/notebooks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'tu_usuario',
      password: 'tu_contrasena',
      database: 'JestOlavaEntregable',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    NotebooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}