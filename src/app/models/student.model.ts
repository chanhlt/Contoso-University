import { BaseModel } from './base.model';
import { ERROR } from '../../core/errors/error-code';
import { AppError } from '../../core/errors/app-error';

interface StudentModel {
  id: number;
  firstName: string;
  lastName: string;
  enrollmentDate: Date;
}

export class StudentCreateRequestModel extends BaseModel<StudentModel> {
  get firstName() {
    const firstName = this.get<string>('firstName');
    if (!firstName) {
      throw new AppError(ERROR.STUDENT_FIRST_NAME_IS_REQUIRED);
    }
    return firstName;
  }

  get lastName() {
    const lastName = this.get<string>('lastName');
    if (!lastName) {
      throw new Error('Student Last Name is required');
    }
    return lastName;
  }

  get enrollmentDate() {
    const enrollmentDate = this.get<Date>('enrollmentDate');
    if (!enrollmentDate) {
      throw new Error('Student Enrollment Date is required');
    }
    return enrollmentDate;
  }
}

export class StudentUpdateRequestModel extends BaseModel<StudentModel> {
  get firstName() {
    const firstName = this.get<string>('firstName');
    if (firstName !== undefined && !firstName) {
      throw new AppError(ERROR.STUDENT_FIRST_NAME_IS_REQUIRED);
    }
    return firstName;
  }

  get lastName() {
    const lastName = this.get<string>('lastName');
    if (lastName !== undefined && !lastName) {
      throw new AppError(ERROR.STUDENT_LAST_NAME_IS_REQUIRED);
    }
    return lastName;
  }

  get enrollmentDate() {
    const enrollmentDate = this.get<Date>('enrollmentDate');
    if (enrollmentDate !== undefined && !enrollmentDate && !new Date(enrollmentDate)) {
      throw new AppError(ERROR.STUDENT_ENROLLMENT_DATE_IS_REQUIRED);
    }
    return enrollmentDate;
  }

  toJSON() {
    return {
      lastName: this.lastName,
      firstName: this.firstName,
      enrollmentDate: this.enrollmentDate
    };
  }
}
