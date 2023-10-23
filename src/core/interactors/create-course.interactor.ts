import { ICourseRepository } from '../repositories/course.repository';
import { Course } from '../entities/course.entity';
import { CourseRequestModel } from '../request-models/course.request-model';
import { CourseResponseModel } from '../response-models/course.response-model';
import { BadRequestError } from '../errors/bad-request.error';
import { ERROR } from '../errors/error-code';

export class CreateCourseInteractor {
  private readonly courseRepository: ICourseRepository;
  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  public async execute(payload: CourseRequestModel): Promise<CourseResponseModel> {
    const course = new Course(null, payload.name, payload.startDate, payload.endDate);
    if (!course.name) {
      throw new BadRequestError(ERROR.COURSE_NAME_IS_REQUIRED);
    }
    if (!course.startDate) {
      throw new BadRequestError(ERROR.COURSE_START_DATE_IS_REQUIRED);
    }
    const { id, name, startDate, endDate } = await this.courseRepository.create(course);
    return { id: id!, name, startDate, endDate };
  }
}
