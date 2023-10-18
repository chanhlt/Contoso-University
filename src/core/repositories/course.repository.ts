import { Course } from '../entities/course.entity';

export interface ICourseRepository {
  findById(id: number): Promise<Omit<Course, 'validate'> | null>;
  create(createCourse: Course): Promise<Omit<Course, 'validate'>>;
  list(offset: number, limit: number): Promise<Omit<Course, 'validate'>[]>;
  count(): Promise<number>;
}
