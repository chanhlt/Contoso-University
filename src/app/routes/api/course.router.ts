import Router from 'koa-router';

import courseController from '../../controllers/course.controller';

const router = new Router();

router.post('/', courseController.create);

export default router;
