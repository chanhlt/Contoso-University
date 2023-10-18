import { ERROR } from '../../../src/core/errors/error-code';
import { ICourseRepository } from '../../../src/core/repositories/course.repository';
import { CreateCourseInteractor } from './../../../src/core/interactors/create-course.interactor';

describe('CreateCourseInteractor', () => {
  test('Create course with valid input => should be OK', async () => {
    const courseRepository = {} as ICourseRepository;
    const name = 'Name 1';
    const startDate = new Date();
    courseRepository.create = jest.fn(() =>
      Promise.resolve({
        id: 1,
        name,
        startDate
      })
    );
    const createCourseInteractor = new CreateCourseInteractor(courseRepository);
    const course = await createCourseInteractor.execute({ name, startDate });
    expect(course).toEqual({
      id: 1,
      name,
      startDate
    });
  });

  test('Create course without course name => should receive 400 error', async () => {
    const courseRepository = {} as ICourseRepository;
    const name = undefined as unknown as string;
    const startDate = new Date();
    const createCourseInteractor = new CreateCourseInteractor(courseRepository);
    await expect(async () => {
      await createCourseInteractor.execute({ name, startDate });
    }).rejects.toThrow(ERROR.COURSE_NAME_IS_REQUIRED);
  });

  test('Create course without start date => should receive 400 error', async () => {
    const courseRepository = {} as ICourseRepository;
    const name = 'Name';
    const startDate = undefined as unknown as Date;
    const createCourseInteractor = new CreateCourseInteractor(courseRepository);
    await expect(async () => {
      await createCourseInteractor.execute({ name, startDate });
    }).rejects.toThrow(ERROR.COURSE_START_DATE_IS_REQUIRED);
  });

  test('Create course with end date => should be OK', async () => {
    const courseRepository = {} as ICourseRepository;
    const name = 'Name';
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setFullYear(startDate.getFullYear() + 1);
    courseRepository.create = jest.fn(() =>
      Promise.resolve({
        id: 1,
        name,
        startDate,
        endDate
      })
    );
    const createCourseInteractor = new CreateCourseInteractor(courseRepository);
    const course = await createCourseInteractor.execute({ name, startDate, endDate });
    expect(course).toEqual({
      id: 1,
      name,
      startDate,
      endDate
    });
  });
});
