import { Course } from '../entities/course.entity';

export interface ICourseRepository {
  update(id: number, payload: Partial<Course>): Promise<Course>;
  findById(id: number): Promise<Course | null>;
  create(createCourse: Course): Promise<Course>;
  list(offset: number, limit: number): Promise<Course[]>;
  count(): Promise<number>;
}
