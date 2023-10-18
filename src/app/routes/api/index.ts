import Router from 'koa-router';

import course from './course.router';

const router = new Router();

router.use('/courses', course.routes());

export default router;
