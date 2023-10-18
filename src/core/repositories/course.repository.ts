import { Course } from '../entities/course.entity';

export interface ICourseRepository {
  update(id: number, payload: Partial<Course>): Promise<Course>;
  findById(id: number): Promise<Course | null>;
  create(payload: Course): Promise<Course>;
  findAll(offset: number, limit: number): Promise<Course[]>;
  count(): Promise<number>;
}
