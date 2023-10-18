import { RouterContext } from 'koa-router';

import { CreateCourseInteractor } from '../../core/interactors/create-course.interactor';
import { ICourseRepository } from '../../core/repositories/course.repository';

const courseController = {
  create: async (ctx: RouterContext) => {
    const {name, startDate, endDate} = ctx.request.body as {name: string; startDate: Date, endDate?: Date};
    const courseRepository = ctx.app.context.courseRepository as ICourseRepository
    const createCourseInteractor = new CreateCourseInteractor(courseRepository);
    ctx.body = createCourseInteractor.execute(name, startDate, endDate);
  },

};

export default courseController;
