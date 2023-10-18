import { UpdateCourseInteractor } from './../../../src/core/interactors/update-course.interactor';
import { ICourseRepository } from '../../../src/core/repositories/course.repository';
import { ITransaction } from '../../../src/core/transaction';
import { ERROR } from '../../../src/core/errors/error-code';

describe('UpdateCourseInteractor', () => {
  test('Update course with valid ID and payload=> should be OK', async () => {
    const courseRepository = {} as ICourseRepository;

    const name = 'Name 1';
    const name2 = 'Name 2';
    const startDate = new Date();

    courseRepository.findById = jest.fn(() =>
      Promise.resolve({
        id: 1,
        name,
        startDate
      })
    );

    courseRepository.update = jest.fn(() =>
      Promise.resolve({
        id: 1,
        name: name2,
        startDate
      })
    );

    courseRepository.findById = jest.fn(() =>
      Promise.resolve({
        id: 1,
        name: name2,
        startDate
      })
    );

    const transaction = {} as ITransaction;
    transaction.begin = jest.fn(() => Promise.resolve());
    transaction.commit = jest.fn(() => Promise.resolve());

    const updateCourseInteractor = new UpdateCourseInteractor(courseRepository, transaction);
    const course = await updateCourseInteractor.execute(1, { name: name2 });
    expect(course).toEqual({
      id: 1,
      name: name2,
      startDate
    });
  });

  test('Update course without ID => should receive 404 error', async () => {
    const courseRepository = {} as ICourseRepository;
    const transaction = {} as ITransaction;
    const updateCourseInteractor = new UpdateCourseInteractor(courseRepository, transaction);
    await expect(async () => {
      await updateCourseInteractor.execute(undefined, {});
    }).rejects.toThrow(ERROR.COURSE_NOT_FOUND);
  });

  test('Update course with non-existing ID => should receive 404 error', async () => {
    const courseRepository = {} as ICourseRepository;
    courseRepository.findById = jest.fn(() => Promise.resolve(null));
    const transaction = {} as ITransaction;
    transaction.begin = jest.fn(() => Promise.resolve());
    transaction.rollback = jest.fn(() => Promise.resolve());
    const updateCourseInteractor = new UpdateCourseInteractor(courseRepository, transaction);
    await expect(async () => {
      await updateCourseInteractor.execute(2, { name: 'name 2' });
    }).rejects.toThrow(ERROR.COURSE_NOT_FOUND);
  });

  test('Update course without update payload => should receive 400 error', async () => {
    const courseRepository = {} as ICourseRepository;
    const transaction = {} as ITransaction;
    courseRepository.findById = jest.fn(() => Promise.resolve(null));
    const updateCourseInteractor = new UpdateCourseInteractor(courseRepository, transaction);
    await expect(async () => {
      await updateCourseInteractor.execute(2, {});
    }).rejects.toThrow(ERROR.COURSE_UPDATE_PAYLOAD_EMPTY);

    await expect(async () => {
      await updateCourseInteractor.execute(2, undefined as unknown as {});
    }).rejects.toThrow(ERROR.COURSE_UPDATE_PAYLOAD_EMPTY);
  });

  test('Update course with valid ID in string => should be OK', async () => {
    const courseRepository = {} as ICourseRepository;
    const name = 'Name 1';
    const name2 = 'Name 2';
    const startDate = new Date();

    courseRepository.findById = jest.fn(() =>
      Promise.resolve({
        id: 1,
        name,
        startDate
      })
    );

    courseRepository.update = jest.fn(() =>
      Promise.resolve({
        id: 1,
        name: name2,
        startDate
      })
    );

    courseRepository.findById = jest.fn(() =>
      Promise.resolve({
        id: 1,
        name: name2,
        startDate
      })
    );

    const transaction = {} as ITransaction;
    transaction.begin = jest.fn(() => Promise.resolve());
    transaction.commit = jest.fn(() => Promise.resolve());

    const updateCourseInteractor = new UpdateCourseInteractor(courseRepository, transaction);
    const course = await updateCourseInteractor.execute('1' as unknown as number, { name: name2 });
    expect(course).toEqual({
      id: 1,
      name: name2,
      startDate
    });
  });
});
