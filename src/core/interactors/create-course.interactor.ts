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

  public async execute({ name, startDate, endDate }: CourseRequestModel): Promise<CourseResponseModel> {
    const course = new Course(name, startDate, endDate);
    if (!course.name) {
      throw new BadRequestError(ERROR.COURSE_NAME_IS_REQUIRED);
    }
    if (!course.startDate) {
      throw new BadRequestError(ERROR.COURSE_START_DATE_IS_REQUIRED);
    }
    const createdCourse = await this.courseRepository.create(course);
    return new CourseResponseModel(createdCourse);
  }
}
