import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksService } from './notebooks.service';
import { NotFoundException } from '@nestjs/common';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { Notebook } from './entities/notebook.entity';

describe('NotebooksService', () => {
  let service: NotebooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotebooksService],
    }).compile();

    service = module.get<NotebooksService>(NotebooksService);
    // Reset the internal state for each test
    (service as any).notebooks = []; 
    (service as any).nextId = 1;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new notebook', () => {
      const createDto: CreateNotebookDto = { title: 'Test', content: 'Content' };
      const newNotebook = service.create(createDto);
      expect(newNotebook).toEqual({ id: 1, ...createDto });
      expect((service as any).notebooks.length).toBe(1);
    });
  });

  describe('findAll', () => {
    it('should return all notebooks', () => {
      const notebook1: CreateNotebookDto = { title: 'Test 1', content: 'Content 1' };
      const notebook2: CreateNotebookDto = { title: 'Test 2', content: 'Content 2' };
      service.create(notebook1);
      service.create(notebook2);
      expect(service.findAll().length).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return a notebook by id', () => {
      const createDto: CreateNotebookDto = { title: 'Test', content: 'Content' };
      service.create(createDto);
      const foundNotebook = service.findOne(1);
      expect(foundNotebook).toEqual({ id: 1, ...createDto });
    });

    it('should throw NotFoundException if notebook is not found', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a notebook by id', () => {
      const createDto: CreateNotebookDto = { title: 'Test', content: 'Content' };
      service.create(createDto);
      const updateDto: UpdateNotebookDto = { title: 'Updated Title' };
      const updatedNotebook = service.update(1, updateDto);
      expect(updatedNotebook.title).toBe('Updated Title');
      expect((service as any).notebooks[0].title).toBe('Updated Title');
    });

    it('should throw NotFoundException if notebook to update is not found', () => {
      const updateDto: UpdateNotebookDto = { title: 'Updated Title' };
      expect(() => service.update(999, updateDto)).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a notebook by id', () => {
      const createDto: CreateNotebookDto = { title: 'Test', content: 'Content' };
      service.create(createDto);
      expect((service as any).notebooks.length).toBe(1);
      service.remove(1);
      expect((service as any).notebooks.length).toBe(0);
    });

    it('should throw NotFoundException if notebook to remove is not found', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});
