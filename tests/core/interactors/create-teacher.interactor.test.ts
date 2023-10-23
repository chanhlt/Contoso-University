import { CreateTeacherInteractor } from '../../../src/core/interactors/create-teacher.interactor';
import { ITeacherRepository } from '../../../src/core/repositories/teacher.repository';
import { ERROR } from '../../../src/core/errors/error-code';

describe('CreateTeacherInteractor', () => {
  test('Create teacher with valid input => should be OK', async () => {
    const teacherRepository = {} as ITeacherRepository;
    const firstName = 'John';
    const lastName = 'Doe';
    const mock = {
      id: 1,
      firstName,
      lastName
    };
    teacherRepository.create = jest.fn(() => Promise.resolve(mock));

    const createTeacherInteractor = new CreateTeacherInteractor(teacherRepository);
    const teacher = await createTeacherInteractor.execute({ firstName, lastName });

    expect(teacher).toEqual(mock);
  });

  test('Create teacher without first name => should receive 400 error', async () => {
    const teacherRepository = {} as ITeacherRepository;
    const firstName = undefined as unknown as string;
    const lastName = 'Doe';
    const createTeacherInteractor = new CreateTeacherInteractor(teacherRepository);
    await expect(async () => {
      await createTeacherInteractor.execute({ firstName, lastName });
    }).rejects.toThrow(ERROR.TEACHER_FIRST_NAME_IS_REQUIRED);
  });

  test('Create teacher without last name => should receive 400 error', async () => {
    const teacherRepository = {} as ITeacherRepository;
    const lastName = undefined as unknown as string;
    const firstName = 'John';
    const createTeacherInteractor = new CreateTeacherInteractor(teacherRepository);
    await expect(async () => {
      await createTeacherInteractor.execute({ firstName, lastName });
    }).rejects.toThrow(ERROR.TEACHER_LAST_NAME_IS_REQUIRED);
  });
});
