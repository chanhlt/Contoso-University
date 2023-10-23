import Router from 'koa-router';

import api from './api';
import { ERROR } from '../../core/errors/error-code';
import { NotFoundError } from '../../core/errors/not-found.error';

const router = new Router();

router.use('/api', api.routes());

router.get('/', (ctx) => {
  ctx.body = { status: 200, code: 'SYSTEM_READY' };
});

router.post('/', (ctx) => {
  throw new Error('Unexpected error');
});

router.all('(.*)', (ctx) => {
  ctx.status = 404;
  ctx.body = new NotFoundError(ERROR.RESOURCE_NOT_FOUND);
});
export default router;
