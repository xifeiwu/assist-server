import { Controller } from 'egg';

export default class PaasController extends Controller {
    public async index() {
        const { ctx } = this;
        // this.app.config
        // this.ctx.curl()
        ctx.body = await ctx.service.test.sayHi('egg');
    }
    casValidator() {
    }
    token4Terminal() {
        const { ctx, service } = this;
    }
}
