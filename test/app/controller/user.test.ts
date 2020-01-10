import { Context } from 'egg';
import { app, mock, assert } from 'egg-mock/bootstrap';

describe('test/app/controller/user.test.ts', () => {
    let ctx: Context;
    let app;

    before(async () => {
        // app.config.env = 'local';
        app = mock.app();
        ctx = app.mockContext();
        console.log(app.config);
        return app.ready();
    });
    it('should POST /api/user/login', async () => {
        console.log(app.config.env);
        // const result = await app.httpRequest().post('/api/user/login').send({
        //     userName: 'test',
        //     password: 'test123'
        // }).expect(200);
        // console.log(result);
        // assert(result.text === 'hi, egg');
    });
});
