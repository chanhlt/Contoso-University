import { Course } from '../interfaces/course.interface';
import { IQuery } from '../interfaces/query.interface';

export interface ICourseEntity {
  createCourse(course: Course): Promise<Course>;
  updateCourse(id: number, payload: Partial<Course>): Promise<Course>;
  findCourses(query?: IQuery): Promise<{ count: number; rows: Course[] }>;
  getCourse(id: number): Promise<Course | null>;
  deleteCourse(id: number): Promise<void>;
}
