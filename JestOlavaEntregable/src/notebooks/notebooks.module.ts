// src/notebooks/notebooks.module.ts
import { Module } from '@nestjs/common';
import { NotebooksService } from './notebooks.service';
import { NotebooksController } from './notebooks.controller';
import { Notebook } from './entities/notebook.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Notebook])],
  controllers: [NotebooksController],
  providers: [NotebooksService],
})
export class NotebooksModule {}