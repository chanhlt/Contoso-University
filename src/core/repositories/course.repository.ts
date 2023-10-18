import { Course } from '../entities/course.entity';

type UpdateCoursePayload = {
  name?: string;
  startDate?: Date;
  endDate?: Date;
};

export interface ICourseRepository {
  update(id: number, payload: UpdateCoursePayload): Promise<Omit<Course, 'validate'>>;
  findById(id: number): Promise<Omit<Course, 'validate'> | null>;
  create(createCourse: Course): Promise<Omit<Course, 'validate'>>;
  list(offset: number, limit: number): Promise<Omit<Course, 'validate'>[]>;
  count(): Promise<number>;
}
