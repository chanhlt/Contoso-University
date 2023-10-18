import { ICourseRepository } from '../repositories/course.repository';
import { Course } from '../entities/course.entity';

export class CreateCourseInteractor {
  private readonly courseRepository: ICourseRepository;
  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository;
  }

  public execute(name: string, startDate: Date, endDate?: Date): Promise<Omit<Course, 'validate'>> {
    const course = new Course(name, startDate, endDate);
    course.validate();
    return this.courseRepository.create(course);
  }
}
