import { CourseAssignment } from '../entities/course-assignment.entity';
import { BadRequestError } from '../errors/bad-request.error';
import { ERROR } from '../errors/error-code';
import { ICourseAssignmentRepository } from '../repositories/course-assignment.repository';
import { CourseAssignmentRequestModel } from '../request-models/course-assignment.request-model';
import { CourseAssignmentResponseModel } from '../response-models/course-assignment.response-model';

export class CreateCourseAssignmentInteractor {
  private readonly courseAssignmentRepository: ICourseAssignmentRepository;
  constructor(courseAssignmentRepository: ICourseAssignmentRepository) {
    this.courseAssignmentRepository = courseAssignmentRepository;
  }

  public async execute(payload: CourseAssignmentRequestModel): Promise<CourseAssignmentResponseModel> {
    const courseAssignment = new CourseAssignment(null, payload.courseId, payload.teacherId, payload.assignedDate);
    if (!courseAssignment.courseId) {
      throw new BadRequestError(ERROR.COURSE_ASSIGNMENT_COURSE_ID_IS_REQUIRED);
    }
    if (!courseAssignment.teacherId) {
      throw new BadRequestError(ERROR.COURSE_ASSIGNMENT_TEACHER_ID_IS_REQUIRED);
    }
    if (!courseAssignment.assignedDate) {
      throw new BadRequestError(ERROR.COURSE_ASSIGNMENT_ASSIGNED_DATE_IS_REQUIRED);
    }
    const { id, courseId, teacherId, assignedDate } = await this.courseAssignmentRepository.create(courseAssignment);
    return new CourseAssignmentResponseModel(id!, courseId, teacherId, assignedDate);
  }
}
