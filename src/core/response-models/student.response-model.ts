import { Grade } from '../enums/grade.enum';

export type StudentResponseModel = {
  id: number;
  firstName: string;
  lastName: string;
  enrollmentDate: Date;
  grade?: Grade;
};
