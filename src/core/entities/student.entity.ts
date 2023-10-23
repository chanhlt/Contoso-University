import { Grade } from '../enums/grade.enum';

export class Student {
  constructor(
    public id: number | null,
    public firstName: string,
    public lastName: string,
    public enrollmentDate: Date,
    public grade?: Grade
  ) {}
}
