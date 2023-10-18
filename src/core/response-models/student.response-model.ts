import { Student } from '../entities/student.entity';
import { Grade } from '../enums/grade.enum';

export class StudentResponseModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public enrollmentDate: Date;
  public grade?: Grade;

  constructor(student: Student) {
    this.id = student.id!;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.enrollmentDate = student.enrollmentDate;
    this.grade = student.grade;
  }
}
