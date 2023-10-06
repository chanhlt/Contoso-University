import { ICourseEntity } from '../entities/course.entity';
import { Course } from '../interfaces/course.interface';
import { IQuery } from '../interfaces/query.interface';

export class CourseService {
  private readonly _courseEntity: ICourseEntity;

  constructor(entity: ICourseEntity) {
    this._courseEntity = entity;
  }

  createCourse(course: Course): Promise<Course> {
    return this._courseEntity.createCourse(course);
  }

  updateCourse(id: number, payload: Partial<Course>): Promise<Course> {
    return this._courseEntity.updateCourse(id, payload);
  }
  findCourses(query?: IQuery): Promise<{ count: number; rows: Course[] }> {
    return this._courseEntity.findCourses(query);
  }
  getCourse(id: number): Promise<Course | null> {
    return this._courseEntity.getCourse(id);
  }
  deleteCourse(id: number): Promise<void> {
    return this._courseEntity.deleteCourse(id);
  }
}
