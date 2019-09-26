import { Controller } from 'egg';

export default class TestController extends Controller {
    async connection() {
        const { ctx } = this;
        // this.app.config
        // this.ctx.curl()
        ctx.body = await ctx.service.test.sayHi('egg');
    }
    info() {
        const { ctx, app, service } = this;
        var { type } = ctx.query;
        const infoMap = {
            config: app.config,
            EGG_SERVER_ENV: process.env.EGG_SERVER_ENV ? process.env.EGG_SERVER_ENV : 'not set',
            NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'not set',
            PLATFORM: process.env.PLATFORM ? process.env.PLATFORM : 'not set',
            paasServer: service.paas.getPaasServer(),
            casServer: service.paas.getCasServer()
        }
        if (!type || !infoMap.hasOwnProperty(type)) {
            ctx.type = 'html';
            ctx.body = '<ul>' + Object.keys(infoMap).map(it => `<li><a href="/api/test/info?type=${it}">${it}</a></li>`).join('') + '</ul>';
        } else {
            ctx.body = infoMap[type];
        }
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
