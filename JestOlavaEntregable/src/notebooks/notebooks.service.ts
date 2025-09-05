import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { Notebook } from './entities/notebook.entity';

@Injectable()
export class NotebooksService {
  private notebooks: Notebook[] = [];
  private nextId = 1;

  create(createNotebookDto: CreateNotebookDto): Notebook {
    const newNotebook: Notebook = {
      id: this.nextId++,
      ...createNotebookDto,
    };
    this.notebooks.push(newNotebook);
    return newNotebook;
  }

  findAll(): Notebook[] {
    return this.notebooks;
  }

  findOne(id: number): Notebook {
    const notebook = this.notebooks.find(nb => nb.id === id);
    if (!notebook) {
      throw new NotFoundException(`Notebook with ID "${id}" not found`);
    }
    return notebook;
  }

  update(id: number, updateNotebookDto: UpdateNotebookDto): Notebook {
    const notebook = this.findOne(id);
    Object.assign(notebook, updateNotebookDto);
    return notebook;
  }

  remove(id: number): void {
    const index = this.notebooks.findIndex(nb => nb.id === id);
    if (index === -1) {
      throw new NotFoundException(`Notebook with ID "${id}" not found`);
    }
    this.notebooks.splice(index, 1);
  }
}
