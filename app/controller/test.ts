import { Controller } from 'egg';

export default class TestController extends Controller {
    async connection() {
        const { ctx } = this;
        // this.app.config
        // this.ctx.curl()
        ctx.body = await ctx.service.test.sayHi('egg');
    }
    echo() {
        const { ctx } = this;
        // ctx.logger.debug(ctx.request.body);
        ctx.body = ctx.request.body;
    }
    async proxy() {
        const { ctx } = this;
        const { target } = ctx.query;
        // ctx.body = ctx.query;
        ctx.body = await ctx.axios.requestData({
            url: target,
        });
    }
    async error() {
        const { ctx } = this;
        const { status, message } = ctx.request.body;
        ctx.throw(status ? status : 200, message ? message : 'no error message');
    }
}
