import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/user.test.js', () => {
    let ctx: Context;

    before(async () => {
        ctx = app.mockContext();
    });

    it('token verify', async () => {
        const {service} = ctx;
        const userTest = await service.user.getUser({
            username: 'test'
        });
        assert(userTest != null);
        const token = await service.user.getToken(userTest);
        const userInfo = await service.user.verifyToken(token);
        assert(token);
        assert(userInfo != null);
        // const id1 = userInfo ? userInfo.id : null;
        // const id2 = userTest ? userTest.id : null;
        // console.log(id1, id2);
        assert(userInfo.id == userTest.id);
    });
});
