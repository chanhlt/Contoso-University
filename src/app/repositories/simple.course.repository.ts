import { Course } from '../../core/entities/course.entity';
import { ICourseRepository } from '../../core/repositories/course.repository';

export class SimpleCourseRepository implements ICourseRepository {
  private static readonly courses: Course[] = [];

  create(course: Course): Promise<Course> {
    course.id = SimpleCourseRepository.courses.length + 1;
    SimpleCourseRepository.courses.push(course);
    return Promise.resolve(course);
  }

  update(id: number, payload: Partial<Course>): Promise<Course> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<Course | null> {
    throw new Error('Method not implemented.');
  }
  findAll(offset: number, limit: number): Promise<Course[]> {
    throw new Error('Method not implemented.');
  }
  count(): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
