import { ICourseRepository } from '../repositories/course.repository';
import { CourseResponseModel } from '../response-models/course.response-model';

type CourseList = { count: number; rows: CourseResponseModel[] };

export class ListCoursesInteractor {
  private readonly courseRepository: ICourseRepository;
  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  public async execute(page = 1, limit = 10): Promise<CourseList> {
    page = this.toPositiveInt(page, 1);
    limit = this.toPositiveInt(limit, 10);
    const offset = (page - 1) * limit;
    const count = await this.courseRepository.count();
    const courses = await this.courseRepository.findAll(offset, limit);
    const rows = courses.map((course) => {
      const { id, name, startDate, endDate } = course;
      return { id: id!, name, startDate, endDate };
    });
    return { count, rows };
  }

  private toPositiveInt(input: number, def: number) {
    if (!input || isNaN(input) || input <= 0) {
      return def;
    }
    if (typeof input == 'string') {
      return parseInt(input);
    }
    return input;
  }
}
