import { ICourseRepository } from '../repositories/course.repository';
import { Course } from '../entities/course.entity';

export class ListCoursesInteractor {
  private readonly courseRepository: ICourseRepository;
  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  public async execute(
    page: number = 1,
    limit: number = 10
  ): Promise<{ count: number; rows: Omit<Course, 'validate'>[] }> {
    const offset = (page - 1) * limit;
    const count = await this.courseRepository.count();
    const rows = await this.courseRepository.list(offset, limit);
    return { count, rows };
  }
}
