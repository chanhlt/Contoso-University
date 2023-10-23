import { ERROR } from './error-code';

export const ERROR_MESSAGE: Record<ERROR, string> = {
  [ERROR.STUDENT_FIRST_NAME_IS_REQUIRED]: 'Student First Name is required',
  [ERROR.STUDENT_LAST_NAME_IS_REQUIRED]: 'Student Last Name is required',
  [ERROR.STUDENT_ENROLLMENT_DATE_IS_REQUIRED]: 'Student Enrollment Date is required',
  [ERROR.STUDENT_NOT_FOUND]: 'Student not found',
  [ERROR.COURSE_NAME_IS_REQUIRED]: 'Course Name is required',
  [ERROR.COURSE_START_DATE_IS_REQUIRED]: 'Course Start Date is required',
  [ERROR.COURSE_UPDATE_PAYLOAD_EMPTY]: 'Course update payload is empty',
  [ERROR.COURSE_NOT_FOUND]: 'Course not found',
  [ERROR.RESOURCE_NOT_FOUND]: 'Resource not found',
  [ERROR.TEACHER_FIRST_NAME_IS_REQUIRED]: 'Teacher First Name is required',
  [ERROR.TEACHER_LAST_NAME_IS_REQUIRED]: 'Teacher Last Name is required'
};
