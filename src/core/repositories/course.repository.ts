import { Course } from "../entities/course.entity";

export interface ICourseRepository{
    create(createCourse: Course): Promise<Course>;
}