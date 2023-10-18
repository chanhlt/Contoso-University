import { Course } from "../../core/entities/course.entity";
import { ICourseRepository } from "../../core/repositories/course.repository";

export class SimpleCourseRepository implements ICourseRepository {
    private courses: Course[] = [];

    create(course: Course): Promise<Course> {
        course.id = this.courses.length+1;
        this.courses.push(course);
        return Promise.resolve(course)
    }

}

