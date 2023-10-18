import { ERROR } from './error-code';

export const ERROR_MESSAGE: Record<ERROR, string> = {
  [ERROR.STUDENT_ID_MUST_BE_A_NUMBER]: 'Student ID must be a number',
  [ERROR.STUDENT_FIRST_NAME_IS_REQUIRED]: 'Student First Name is required',
  [ERROR.STUDENT_LAST_NAME_IS_REQUIRED]: '',
  [ERROR.STUDENT_ENROLLMENT_DATE_IS_REQUIRED]: '',
  [ERROR.STUDENT_DOES_NOT_EXIST]: '',
  [ERROR.COURSE_NAME_IS_REQUIRED]: 'Course name is required',
  [ERROR.COURSE_START_DATE_IS_REQUIRED]: 'Course start date is required',
  [ERROR.COURSE_NOT_FOUND]: 'Course not found',
  [ERROR.COURSE_UPDATE_PAYLOAD_EMPTY]: 'Course update payload is empty',
  [ERROR.RESOURCE_NOT_FOUND]: 'Resource not found'
};
