import { CourseAssignment } from '../entities/course-assignment.entity';

export interface ICourseAssignmentRepository {
  update(id: number, payload: Partial<CourseAssignment>): Promise<CourseAssignment>;
  findById(id: number): Promise<CourseAssignment | null>;
  create(payload: CourseAssignment): Promise<CourseAssignment>;
  findAll(offset: number, limit: number): Promise<CourseAssignment[]>;
  count(): Promise<number>;
}
