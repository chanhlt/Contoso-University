import { Context, Next } from 'koa';
import { AppError } from '../../core/errors/app-error';

export const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = (error as AppError)['status'] ?? 500;
    ctx.body = error;
  }
};
