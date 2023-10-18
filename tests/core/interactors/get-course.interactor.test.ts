import { GetCourseInteractor } from './../../../src/core/interactors/get-course.interactor';
import { ICourseRepository } from '../../../src/core/repositories/course.repository';
import { ERROR } from '../../../src/core/errors/error-code';

describe('GetCourseInteractor', () => {
  test('Get course with valid ID => should be OK', async () => {
    const courseRepository = {} as ICourseRepository;
    const name = 'Name 1';
    const startDate = new Date();
    courseRepository.findById = jest.fn(() =>
      Promise.resolve({
        id: 1,
        name,
        startDate
      })
    );
    const getCourseInteractor = new GetCourseInteractor(courseRepository);
    const course = await getCourseInteractor.execute(1);
    expect(course).toEqual({
      id: 1,
      name,
      startDate
    });
  });

  test('Get course without ID => should receive 404 error', async () => {
    const courseRepository = {} as ICourseRepository;
    const getCourseInteractor = new GetCourseInteractor(courseRepository);
    await expect(async () => {
      await getCourseInteractor.execute(undefined);
    }).rejects.toThrow(ERROR.COURSE_NOT_FOUND);
  });

  test('Get course with non-existing ID => should receive 404 error', async () => {
    const courseRepository = {} as ICourseRepository;
    courseRepository.findById = jest.fn(() => Promise.resolve(null));
    const getCourseInteractor = new GetCourseInteractor(courseRepository);
    await expect(async () => {
      await getCourseInteractor.execute(2);
    }).rejects.toThrow(ERROR.COURSE_NOT_FOUND);
  });

  test('Get course with valid ID in string => should be OK', async () => {
    const courseRepository = {} as ICourseRepository;
    const name = 'Name 1';
    const startDate = new Date();
    courseRepository.findById = jest.fn(() =>
      Promise.resolve({
        id: 1,
        name,
        startDate
      })
    );
    const getCourseInteractor = new GetCourseInteractor(courseRepository);
    const course = await getCourseInteractor.execute('1' as unknown as number);
    expect(course).toEqual({
      id: 1,
      name,
      startDate
    });
  });
});
