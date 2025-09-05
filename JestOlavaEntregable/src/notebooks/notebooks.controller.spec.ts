import { Test, TestingModule } from '@nestjs/testing';
import { NotebooksController } from './notebooks.controller';
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { Notebook } from './entities/notebook.entity';
import { NotFoundException } from '@nestjs/common';

describe('NotebooksController', () => {
  let controller: NotebooksController;
  let service: NotebooksService;
  

  let mockNotebooksService: any;

  beforeEach(async () => {
    mockNotebooksService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotebooksController],
      providers: [
        {
          provide: NotebooksService,
          useValue: mockNotebooksService,
        },
      ],
    }).compile();

    controller = module.get<NotebooksController>(NotebooksController);
    service = module.get<NotebooksService>(NotebooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new notebook and return it', async () => {
      const createDto: CreateNotebookDto = {
        title: 'Test Notebook',
        content: 'This is a test.',
      };
      const expectedResult: Notebook = { id: 1, ...createDto };
      mockNotebooksService.create.mockResolvedValue(expectedResult);
      
      const result = await controller.create(createDto);
      
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of notebooks', async () => {
      const expectedResult: Notebook[] = [
        { id: 1, title: 'Test 1', content: 'Content 1' },
        { id: 2, title: 'Test 2', content: 'Content 2' },
      ];
      mockNotebooksService.findAll.mockResolvedValue(expectedResult);
      
      const result = await controller.findAll();
      
      expect(result).toEqual(expectedResult);
    });
  });
  
  describe('findOne', () => {
    it('should return a single notebook', async () => {
      const notebookId = '1';
      const expectedResult: Notebook = { id: 1, title: 'Test 1', content: 'Content 1' };
      mockNotebooksService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne(notebookId);

      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException if notebook is not found', async () => {
      const notebookId = '999';
      mockNotebooksService.findOne.mockRejectedValue(new NotFoundException(`Notebook with ID "${notebookId}" not found`));

      // Esta vez usamos el método .rejects.toThrow() que ha funcionado en otros entornos
      await expect(controller.findOne(notebookId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a notebook and return it', async () => {
      const notebookId = '1';
      const updateDto: UpdateNotebookDto = { title: 'Updated Title' };
      const expectedResult: Notebook = { id: 1, title: 'Updated Title', content: 'Content 1' };
      mockNotebooksService.update.mockResolvedValue(expectedResult);

      const result = await controller.update(notebookId, updateDto);

      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException if notebook to update is not found', async () => {
      const notebookId = '999';
      const updateDto: UpdateNotebookDto = { title: 'Updated Title' };

      // Configuración del mock para que lance la excepción directamente.
      mockNotebooksService.update.mockImplementation(() => {
        throw new NotFoundException(`Notebook with ID "${notebookId}" not found`);
      });
      
      let error: any;
      try {
        // Encerramos la llamada al controlador en un try-catch para capturar la excepción manualmente.
        await controller.update(notebookId, updateDto);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(`Notebook with ID "${notebookId}" not found`);
    });
  });

  describe('remove', () => {
    it('should remove a notebook and return a success message', async () => {
      const notebookId = '1';
      mockNotebooksService.remove.mockResolvedValue({ message: 'Notebook deleted successfully' });
      
      const result = await controller.remove(notebookId);

      expect(result).toEqual({ message: 'Notebook deleted successfully' });
    });

    it('should throw NotFoundException if notebook to remove is not found', async () => {
      const notebookId = '999';
      
      // Configuración del mock para que lance la excepción directamente.
      mockNotebooksService.remove.mockImplementation(() => {
        throw new NotFoundException(`Notebook with ID "${notebookId}" not found`);
      });

      let error: any;
      try {
        // Encerramos la llamada al controlador en un try-catch para capturar la excepción manualmente.
        await controller.remove(notebookId);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toBe(`Notebook with ID "${notebookId}" not found`);
    });
  });
});