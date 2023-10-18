import { ListCoursesInteractor } from './../../../src/core/interactors/list-courses.interactor';
import { ICourseRepository } from '../../../src/core/repositories/course.repository';

describe('ListCoursesInteractor', () => {
  test('List courses with valid page and limit => should be OK', async () => {
    const courseRepository = {} as ICourseRepository;
    const page = 1;
    const limit = 5;
    const name = 'Name 1';
    const startDate = new Date();
    const name2 = 'Name 2';
    const startDate2 = new Date();
    courseRepository.count = jest.fn(() => Promise.resolve(2));
    courseRepository.list = jest.fn(() =>
      Promise.resolve([
        { id: 1, name, startDate },
        { id: 2, name: name2, startDate: startDate2 }
      ])
    );
    const listCoursesInteractor = new ListCoursesInteractor(courseRepository);
    const { count, rows } = await listCoursesInteractor.execute(page, limit);
    expect(count).toBe(2);
    expect(rows).toEqual([
      { id: 1, name, startDate },
      { id: 2, name: name2, startDate: startDate2 }
    ]);
    expect(courseRepository.list).toBeCalledWith(0, 5);
  });

  test('List courses without page and limit => should be OK', async () => {
    const courseRepository = {} as ICourseRepository;
    const name = 'Name 1';
    const startDate = new Date();
    const name2 = 'Name 2';
    const startDate2 = new Date();
    courseRepository.count = jest.fn(() => Promise.resolve(2));
    courseRepository.list = jest.fn(() =>
      Promise.resolve([
        { id: 1, name, startDate },
        { id: 2, name: name2, startDate: startDate2 }
      ])
    );
    const listCoursesInteractor = new ListCoursesInteractor(courseRepository);
    const { count, rows } = await listCoursesInteractor.execute();
    expect(count).toBe(2);
    expect(rows).toEqual([
      { id: 1, name, startDate },
      { id: 2, name: name2, startDate: startDate2 }
    ]);
    expect(courseRepository.list).toBeCalledWith(0, 10);
  });
});
