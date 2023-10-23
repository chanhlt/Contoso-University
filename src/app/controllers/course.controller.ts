import { RouterContext } from 'koa-router';

import { CreateCourseInteractor } from '../../core/interactors/create-course.interactor';
import { SimpleCourseRepository } from '../repositories/simple.course.repository';
import { UpdateCourseInteractor } from '../../core/interactors/update-course.interactor';
import { SimpleTransaction } from '../simple.transaction';

const CourseController = {
  create: async (ctx: RouterContext) => {
    const { name, startDate, endDate } = ctx.request.body as { name: string; startDate: Date; endDate?: Date };
    const courseRepository = new SimpleCourseRepository();
    const createCourseInteractor = new CreateCourseInteractor(courseRepository);
    ctx.body = await createCourseInteractor.execute({ name, startDate, endDate });
  },
  update: async (ctx: RouterContext) => {
    const { id } = ctx.params;
    const { name, startDate, endDate } = ctx.request.body as { name?: string; startDate?: Date; endDate?: Date };
    const courseRepository = new SimpleCourseRepository();
    const transaction = new SimpleTransaction();
    const updateCourseInteractor = new UpdateCourseInteractor(courseRepository, transaction);
    ctx.body = await updateCourseInteractor.execute(Number(id), { name, startDate, endDate });
  }
};

export default CourseController;
