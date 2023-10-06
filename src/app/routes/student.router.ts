import Router from 'koa-router';

import studentController from '../controllers/student.controller';

const router = new Router();

router.post('/', studentController.create);
router.patch('/', studentController.update);

export default router;
