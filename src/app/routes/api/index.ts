import Router from 'koa-router';

import course from '../../routers/course.router';

const router = new Router();

router.use('/courses', course.routes());

export default router;
