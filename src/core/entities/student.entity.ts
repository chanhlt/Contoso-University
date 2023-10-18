import { Grade } from '../enums/grade.enum';

export class Student {
  public id?: number;
  constructor(
    public firstName: string,
    public lastName: string,
    public enrollmentDate: Date,
    public grade?: Grade
  ) {}
}
