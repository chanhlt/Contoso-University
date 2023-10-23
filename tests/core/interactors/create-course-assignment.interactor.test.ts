import { ERROR } from '../../../src/core/errors/error-code';
import { ICourseAssignmentRepository } from '../../../src/core/repositories/course-assignment.repository';
import { CreateCourseAssignmentInteractor } from '../../../src/core/interactors/create-course-assignment.interactor';

describe('CreateCourseAssignmentInteractor', () => {
  test('Create course-assignment with valid input => should be OK', async () => {
    const courseAssignmentRepository = {} as ICourseAssignmentRepository;
    const courseId = 1;
    const teacherId = 2;
    const assignedDate = new Date();
    courseAssignmentRepository.create = jest.fn(() =>
      Promise.resolve({
        id: 1,
        courseId,
        teacherId,
        assignedDate
      })
    );
    const createCourseAssignmentInteractor = new CreateCourseAssignmentInteractor(courseAssignmentRepository);
    const courseAssignment = await createCourseAssignmentInteractor.execute({ courseId, teacherId, assignedDate });
    expect(courseAssignment).toEqual({
      id: 1,
      courseId,
      teacherId,
      assignedDate
    });
  });

  test('Create course-assignment without course ID => should receive 400 error', async () => {
    const courseAssignmentRepository = {} as ICourseAssignmentRepository;
    const courseId = undefined as unknown as number;
    const teacherId = 2;
    const assignedDate = new Date();
    const createCourseAssignmentInteractor = new CreateCourseAssignmentInteractor(courseAssignmentRepository);
    await expect(async () => {
      await createCourseAssignmentInteractor.execute({ courseId, teacherId, assignedDate });
    }).rejects.toThrow(ERROR.COURSE_ASSIGNMENT_COURSE_ID_IS_REQUIRED);
  });

  test('Create course-assignment without teacher ID => should receive 400 error', async () => {
    const courseAssignmentRepository = {} as ICourseAssignmentRepository;
    const courseId = 1;
    const teacherId = undefined as unknown as number;
    const assignedDate = new Date();
    const createCourseAssignmentInteractor = new CreateCourseAssignmentInteractor(courseAssignmentRepository);
    await expect(async () => {
      await createCourseAssignmentInteractor.execute({ courseId, teacherId, assignedDate });
    }).rejects.toThrow(ERROR.COURSE_ASSIGNMENT_TEACHER_ID_IS_REQUIRED);
  });

  test('Create course-assignment without assigned date => should receive 400 error', async () => {
    const courseAssignmentRepository = {} as ICourseAssignmentRepository;
    const courseId = 1;
    const teacherId = 2;
    const assignedDate = undefined as unknown as Date;
    const createCourseAssignmentInteractor = new CreateCourseAssignmentInteractor(courseAssignmentRepository);
    await expect(async () => {
      await createCourseAssignmentInteractor.execute({ courseId, teacherId, assignedDate });
    }).rejects.toThrow(ERROR.COURSE_ASSIGNMENT_ASSIGNED_DATE_IS_REQUIRED);
  });

  test('Create course-assignment with end date => should be OK', async () => {
    const courseAssignmentRepository = {} as ICourseAssignmentRepository;
    const courseId = 1;
    const teacherId = 2;
    const assignedDate = new Date();
    courseAssignmentRepository.create = jest.fn(() =>
      Promise.resolve({
        id: 1,
        courseId,
        teacherId,
        assignedDate
      })
    );
    const createCourseAssignmentInteractor = new CreateCourseAssignmentInteractor(courseAssignmentRepository);
    const courseAssignment = await createCourseAssignmentInteractor.execute({ courseId, teacherId, assignedDate });
    expect(courseAssignment).toEqual({
      id: 1,
      courseId,
      teacherId,
      assignedDate
    });
  });
});
