import { PartialType } from '@nestjs/mapped-types';
import { CreateNotebookDto } from './create-notebook.dto';

export class UpdateNotebookDto extends PartialType(CreateNotebookDto) {}
describe('UpdateNotebookDto', () => {
  it('should be defined', () => {
    expect(new UpdateNotebookDto()).toBeDefined();
  });
});