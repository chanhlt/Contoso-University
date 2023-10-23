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
    const rows = await this.courseRepository.findAll(offset, limit);
    return {
      count,
      rows: rows.map((row) => {
        return new CourseResponseModel(row.id!, row.name, row.startDate, row.endDate);
      })
    };
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
