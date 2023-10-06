import { ICourseEntity } from '../../../src/core/entities/course.entity';
import { Course } from '../../../src/core/interfaces/course.interface';
import { CourseService } from './../../../src/core/services/course.service';

describe('`Course` service', () => {
  let courseId = 1;
  const courses: Course[] = [];
  const courseEntity = {} as ICourseEntity;
  courseEntity.createCourse = jest.fn((payload: Course) => {
    const course = {...payload, id: courseId++}
    courses.push(course);
    return Promise.resolve(course);
  });
  courseEntity.getCourse = jest.fn((id: number)=>{
    const course = courses.find(c => c.id === id) ?? null;
    return Promise.resolve(course);
  });
  courseEntity.findCourses = jest.fn(()=>Promise.resolve({
    count: courses.length,
    rows: courses
  }));
  courseEntity.updateCourse = jest.fn((id: number, payload: Partial<Course>)=>{
    const course = courses.find(c => c.id === id) ?? null;
    if(!course){
      throw new Error('Course not found!')
    }
    Object.assign(course, payload);
    return Promise.resolve(course);
  });

  courseEntity.deleteCourse = jest.fn((id: number)=>{
    const index = courses.findIndex(c => c.id === id);
    if(index === -1) {
      throw new Error('Course not found!')
    }
    courses.splice(index, 1);
    return Promise.resolve();
  });
  const courseService = new CourseService(courseEntity);
  
  test('Create a new Course => should be OK', async () => {
    const payload = {} as Course;
    payload.title = 'course 1';
    expect(await courseService.createCourse(payload)).toEqual({title: 'course 1', id: 1})
    expect(await courseService.findCourses()).toEqual({
      count: 1,
      rows: [{...payload, id: 1}]
    })
  });

  test('Get Course by ID => should be OK', async () => {
    expect(await courseService.getCourse(1)).toEqual({title: 'course 1', id: 1})
  });

  test('Find Courses => should be OK', async () => {
    expect(await courseService.findCourses()).toEqual({
      count: 1,
      rows: [
        {title: 'course 1', id: 1}
      ]
    })
  });

  test('Update a Course => should be OK', async () => {
    expect(await courseService.updateCourse(1, {title: 'course 2'})).toEqual(
        {title: 'course 2', id: 1}
    )
  });

  test('Create another Course => should be OK', async () => {
    const payload = {} as Course;
    payload.title = 'course 3';
    expect(await courseService.createCourse(payload)).toEqual({title: 'course 3', id: 2})
    expect(await courseService.findCourses()).toMatchObject({
      count: 2,
    })
  });

  test('Delete a Course => should be OK', async () => {
    expect(await courseService.deleteCourse(1)).toEqual(undefined);
    expect(await courseService.findCourses()).toMatchObject({
      count: 1,
    })
  });

});
