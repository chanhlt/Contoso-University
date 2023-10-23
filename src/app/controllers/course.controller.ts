import { RouterContext } from 'koa-router';

import { CreateCourseInteractor } from '../../core/interactors/create-course.interactor';
import { SimpleCourseRepository } from '../repositories/simple.course.repository';

const CourseController = {
  create: async (ctx: RouterContext) => {
    const { name, startDate, endDate } = ctx.request.body as { name: string; startDate: Date; endDate?: Date };
    const courseRepository = new SimpleCourseRepository();
    const createCourseInteractor = new CreateCourseInteractor(courseRepository);
    ctx.body = await createCourseInteractor.execute({ name, startDate, endDate });
  }
};

export default CourseController;
