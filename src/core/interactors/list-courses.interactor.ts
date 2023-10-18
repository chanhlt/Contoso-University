import { ICourseRepository } from '../repositories/course.repository';
import { Course } from '../entities/course.entity';

export class ListCoursesInteractor {
  private readonly courseRepository: ICourseRepository;
  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  public async execute(page = 1, limit = 10): Promise<{ count: number; rows: Omit<Course, 'validate'>[] }> {
    page = this.toPositiveInt(page, 1);
    limit = this.toPositiveInt(limit, 10);
    const offset = (page - 1) * limit;
    const count = await this.courseRepository.count();
    const rows = await this.courseRepository.list(offset, limit);
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
