import { Grade } from '../enums/grade.enum';

export type StudentRequestModel = {
  firstName: string;
  lastName: string;
  enrollmentDate: Date;
  grade?: Grade;
};
