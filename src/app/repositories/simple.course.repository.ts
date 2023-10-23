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
    const course = SimpleCourseRepository.courses.find((c) => c.id === id);
    const updateData: { [key: string]: unknown } = {};
    for (const prop in payload) {
      if (payload[prop as keyof Course] !== undefined) {
        updateData[prop] = payload[prop as keyof Course];
      }
    }
    Object.assign(course!, updateData);
    return Promise.resolve(course!);
  }

  findById(id: number): Promise<Course | null> {
    const course = SimpleCourseRepository.courses.find((c) => c.id === id);
    return Promise.resolve(course ?? null);
  }

  findAll(offset: number, limit: number): Promise<Course[]> {
    const total = SimpleCourseRepository.courses.length;
    const count = Math.min(limit, total - offset);
    if (offset >= total) {
      return Promise.resolve([]);
    }
    return Promise.resolve(SimpleCourseRepository.courses.slice(offset, count));
  }

  count(): Promise<number> {
    return Promise.resolve(SimpleCourseRepository.courses.length);
  }
}
