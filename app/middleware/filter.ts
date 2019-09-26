import { Context } from 'egg';

export default (): any => {
    return async (ctx: Context, next: any) => {
        ctx.logger.info(ctx.url);
        await next();
    };
};