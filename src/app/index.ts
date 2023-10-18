import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import appRouter from './routes';
import { errorHandler } from './middleware/error-handler';

const app = new Koa();

app.use(bodyParser());
app.use(errorHandler);
app.use(appRouter.routes());

export default app;
