import { Course } from '../../core/entities/course.entity';
import { ICourseRepository } from '../../core/repositories/course.repository';

export class SimpleCourseRepository implements ICourseRepository {
  private static readonly courses: Course[] = [];

  create(course: Course): Promise<Course> {
    course.id = SimpleCourseRepository.courses.length + 1;
    SimpleCourseRepository.courses.push(course);
    return Promise.resolve(course);
  }
}
