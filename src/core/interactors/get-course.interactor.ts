import { ICourseRepository } from '../repositories/course.repository';
import { NotFoundError } from '../errors/not-found.error';
import { ERROR } from '../errors/error-code';
import { CourseResponseModel } from '../response-models/course.response-model';

export class GetCourseInteractor {
  private readonly courseRepository: ICourseRepository;
  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  public async execute(id: number | undefined): Promise<CourseResponseModel> {
    id = this.toPositiveInt(id);
    if (!id) {
      throw new NotFoundError(ERROR.COURSE_NOT_FOUND);
    }
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new NotFoundError(ERROR.COURSE_NOT_FOUND);
    }
    return new CourseResponseModel(course.id!, course.name, course.startDate, course.endDate);
  }

  private toPositiveInt(input: number | undefined) {
    if (!input || isNaN(input) || input <= 0) {
      return undefined;
    }
    if (typeof input == 'string') {
      return parseInt(input);
    }
    return input;
  }
}
