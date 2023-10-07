import { StudentService } from './../../../src/core/services/student.service';
import { MockStudentRepository } from './student.repository.mock';
import { Student } from '../../../src/core/entities/student.entity';
import { ERROR } from '../../../src/core/errors/error-code';

describe('`Student` service', () => {
  const studentRepository = new MockStudentRepository();
  const studentService = new StudentService(studentRepository);

  test('Create a new Student with valid payload => should be OK', async () => {
    const payload = {} as Student;
    payload.firstName = 'John';
    payload.lastName = 'Smith';
    payload.enrollmentDate = new Date();
    expect(await studentService.createStudent(payload)).toEqual({
      ...payload,
      id: 1
    });
  });

  test('Create a new Student without firstName => should throw STUDENT_FIRST_NAME_IS_REQUIRED', async () => {
    const payload = {} as Student;
    payload.lastName = 'Smith';
    expect(async () => {
      await studentService.createStudent(payload);
    }).rejects.toThrow(ERROR.STUDENT_FIRST_NAME_IS_REQUIRED);
  });

  test('Create a new Student without lastName => should throw STUDENT_LAST_NAME_IS_REQUIRED', async () => {
    const payload = {} as Student;
    payload.firstName = 'John';
    expect(async () => {
      await studentService.createStudent(payload);
    }).rejects.toThrow(ERROR.STUDENT_LAST_NAME_IS_REQUIRED);
  });

  test('Create a new Student without enrollmentDate => should throw STUDENT_ENROLLMENT_DATE_IS_REQUIRED', async () => {
    const payload = {} as Student;
    payload.lastName = 'John';
    payload.firstName = 'Smith';
    expect(async () => {
      await studentService.createStudent(payload);
    }).rejects.toThrow(ERROR.STUDENT_ENROLLMENT_DATE_IS_REQUIRED);
  });

  test('Update a Student firstName to a valid value => should be OK', async () => {
    const payload = {} as Student;
    payload.firstName = 'Joe';
    expect(await studentService.updateStudent(1, payload)).toMatchObject({
      firstName: 'Joe',
      id: 1
    });
  });

  test('Create a second Student with valid payload => should be OK', async () => {
    const payload = {} as Student;
    payload.firstName = 'David';
    payload.lastName = 'Fox';
    payload.enrollmentDate = new Date();
    expect(await studentService.createStudent(payload)).toEqual({
      ...payload,
      id: 2
    });
  });

  // test('Update a not-existing Student => should throw STUDENT_DOES_NOT_EXIST', async () => {
  //   const payload = {} as Student;
  //   payload.firstName = 'First 2';
  //   payload.lastName = 'Last';
  //   await expect(studentService.updateStudent(3, payload)).rejects.toThrow(ERROR.STUDENT_DOES_NOT_EXIST);
  // });

  // test('Select a Student by correct ID => should be OK', async () => {
  //   expect(await studentService.findStudentByPk(2)).toEqual({
  //     firstName: 'Second',
  //     lastName: 'Second',
  //     id: 2
  //   });
  // });
});
