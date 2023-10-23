import Router from 'koa-router';

import CourseController from '../controllers/course.controller';

const router = new Router();

router.post('/', CourseController.create);
router.patch('/:id', CourseController.update);

export default router;
