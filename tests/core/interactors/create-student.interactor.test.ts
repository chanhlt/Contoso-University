import { CreateStudentInteractor } from './../../../src/core/interactors/create-student.interactor';
import { IStudentRepository } from './../../../src/core/repositories/student.repository';
import { ERROR } from '../../../src/core/errors/error-code';
import { Grade } from '../../../src/core/enums/grade.enum';

describe('CreateStudentInteractor', () => {
  test('Create student with valid input => should be OK', async () => {
    const studentRepository = {} as IStudentRepository;
    const firstName = 'John';
    const lastName = 'Doe';
    const enrollmentDate = new Date();
    const mock = {
      id: 1,
      firstName,
      lastName,
      enrollmentDate
    };
    studentRepository.create = jest.fn(() => Promise.resolve(mock));

    const createStudentInteractor = new CreateStudentInteractor(studentRepository);
    const student = await createStudentInteractor.execute({ firstName, lastName, enrollmentDate });

    expect(student).toEqual(mock);
  });

  test('Create student without first name => should receive 400 error', async () => {
    const studentRepository = {} as IStudentRepository;
    const firstName = undefined as unknown as string;
    const lastName = 'Doe';
    const enrollmentDate = new Date();
    const createStudentInteractor = new CreateStudentInteractor(studentRepository);
    await expect(async () => {
      await createStudentInteractor.execute({ firstName, lastName, enrollmentDate });
    }).rejects.toThrow(ERROR.STUDENT_FIRST_NAME_IS_REQUIRED);
  });

  test('Create student without last name => should receive 400 error', async () => {
    const studentRepository = {} as IStudentRepository;
    const lastName = undefined as unknown as string;
    const firstName = 'John';
    const enrollmentDate = new Date();
    const createStudentInteractor = new CreateStudentInteractor(studentRepository);
    await expect(async () => {
      await createStudentInteractor.execute({ firstName, lastName, enrollmentDate });
    }).rejects.toThrow(ERROR.STUDENT_LAST_NAME_IS_REQUIRED);
  });

  test('Create student without enrollment date => should receive 400 error', async () => {
    const studentRepository = {} as IStudentRepository;
    const lastName = 'John';
    const firstName = 'John';
    const enrollmentDate = undefined as unknown as Date;
    const createStudentInteractor = new CreateStudentInteractor(studentRepository);
    await expect(async () => {
      await createStudentInteractor.execute({ firstName, lastName, enrollmentDate });
    }).rejects.toThrow(ERROR.STUDENT_ENROLLMENT_DATE_IS_REQUIRED);
  });

  test('Create student with grade => should be OK', async () => {
    const studentRepository = {} as IStudentRepository;
    const firstName = 'John';
    const lastName = 'Doe';
    const enrollmentDate = new Date();
    const grade = Grade.A;
    const mock = {
      id: 1,
      firstName,
      lastName,
      enrollmentDate,
      grade
    };
    studentRepository.create = jest.fn(() => Promise.resolve(mock));
    const createStudentInteractor = new CreateStudentInteractor(studentRepository);
    const student = await createStudentInteractor.execute({ firstName, lastName, enrollmentDate, grade });
    expect(student).toEqual(mock);
  });
});
