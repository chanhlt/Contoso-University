import { UpdateCourseInteractor } from './../../../src/core/interactors/update-course.interactor';
import { ICourseRepository } from '../../../src/core/repositories/course.repository';
import { ITransaction } from '../../../src/core/transaction';
import { ERROR } from '../../../src/core/errors/error-code';

describe('UpdateCourseInteractor', () => {
  test('Update course name with valid ID and payload => should be OK', async () => {
    const courseRepository = {} as ICourseRepository;

    const name = 'Name 1';
    const name2 = 'Name 2';
    const startDate = new Date();

    const origin = { id: 1, name, startDate };
    const updated = { id: 1, name: name2, startDate };

    courseRepository.findById = jest.fn(() => Promise.resolve(origin));
    courseRepository.update = jest.fn(() => Promise.resolve(updated));
    courseRepository.findById = jest.fn(() => Promise.resolve(updated));

    const transaction = {} as ITransaction;
    transaction.begin = jest.fn(() => Promise.resolve());
    transaction.commit = jest.fn(() => Promise.resolve());

    const updateCourseInteractor = new UpdateCourseInteractor(courseRepository, transaction);
    const course = await updateCourseInteractor.execute(1, { name: name2 });
    expect(course).toEqual(updated);
    expect(courseRepository.update).toBeCalledWith(1, { name: name2 });
  });

  test('Update course startDate with valid ID and payload => should be OK', async () => {
    const courseRepository = {} as ICourseRepository;

    const name = 'Name 1';
    const startDate = new Date();
    const startDate2 = new Date(startDate);
    startDate2.setMonth(startDate.getMonth() + 1);

    const origin = { id: 1, name, startDate };
    const updated = { id: 1, name, startDate: startDate2 };

    courseRepository.findById = jest.fn(() => Promise.resolve(origin));
    courseRepository.update = jest.fn(() => Promise.resolve(updated));
    courseRepository.findById = jest.fn(() => Promise.resolve(updated));

    const transaction = {} as ITransaction;
    transaction.begin = jest.fn(() => Promise.resolve());
    transaction.commit = jest.fn(() => Promise.resolve());

    const updateCourseInteractor = new UpdateCourseInteractor(courseRepository, transaction);
    const course = await updateCourseInteractor.execute(1, { startDate: startDate2 });
    expect(course).toEqual(updated);
    expect(courseRepository.update).toBeCalledWith(1, { startDate: startDate2 });
  });

  test('Update course endDate with valid ID and payload => should be OK', async () => {
    const courseRepository = {} as ICourseRepository;

    const name = 'Name 1';
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setFullYear(startDate.getFullYear() + 1);

    const origin = { id: 1, name, startDate };
    const updated = { id: 1, name, startDate, endDate };

    courseRepository.findById = jest.fn(() => Promise.resolve(origin));
    courseRepository.update = jest.fn(() => Promise.resolve(updated));
    courseRepository.findById = jest.fn(() => Promise.resolve(updated));

    const transaction = {} as ITransaction;
    transaction.begin = jest.fn(() => Promise.resolve());
    transaction.commit = jest.fn(() => Promise.resolve());

    const updateCourseInteractor = new UpdateCourseInteractor(courseRepository, transaction);
    const course = await updateCourseInteractor.execute(1, { endDate });
    expect(course).toEqual(updated);
    expect(courseRepository.update).toBeCalledWith(1, { endDate });
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

    const origin = { id: 1, name, startDate };
    const updated = { id: 1, name: name2, startDate };

    courseRepository.findById = jest.fn(() => Promise.resolve(origin));
    courseRepository.update = jest.fn(() => Promise.resolve(updated));
    courseRepository.findById = jest.fn(() => Promise.resolve(updated));

    const transaction = {} as ITransaction;
    transaction.begin = jest.fn(() => Promise.resolve());
    transaction.commit = jest.fn(() => Promise.resolve());

    const updateCourseInteractor = new UpdateCourseInteractor(courseRepository, transaction);
    const course = await updateCourseInteractor.execute('1' as unknown as number, { name: name2 });
    expect(course).toEqual(updated);
  });
});
