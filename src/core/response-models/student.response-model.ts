import { Grade } from '../enums/grade.enum';

export class StudentResponseModel {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public enrollmentDate: Date,
    public grade?: Grade
  ) {}
}
