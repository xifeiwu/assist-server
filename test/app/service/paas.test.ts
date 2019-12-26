import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/paas.test.js', () => {
    let ctx: Context;

    before(async () => {
        ctx = app.mockContext();
    });

    it('getPaasServer', async () => {
        var casServer = '';
        process.env.PLATFORM = 'renmai:production';
        casServer = await ctx.service.paas.getCasServer();
        assert(casServer === 'http://puhui-cas.public.production/puhui-cas');
        process.env.PLATFORM = 'finup:test';
        casServer = await ctx.service.paas.getCasServer();
        assert(casServer === 'http://cas.finupgroup.com/puhui-cas');
    });
});
