import { Course } from '../entities/course.entity';

export class CourseResponseModel {
  public id: number;
  public name: string;
  public startDate: Date;
  public endDate?: Date;

  constructor(course: Course) {
    this.id = course.id!;
    this.name = course.name;
    this.startDate = course.startDate;
    this.endDate = course.endDate;
  }
}
