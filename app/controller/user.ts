const crypto = require('crypto');
import { Controller } from 'egg';

export default class UserController extends Controller {
    async login() {
        const { ctx, app, service } = this;
        const { username, password } = ctx.request.body;
        ctx.assert(username, 400, 'userName is needed');
        ctx.assert(password, 400, 'password is needed');
        const passwordSha256 = crypto.createHmac('sha256', app.config.secret).update(password).digest('base64');
        const user = await service.user.getUser({ username, passwordSha256 });
        if (user) {
            ctx.status = 200;
            ctx.body = {
                username: user.username,
                realname: user.realname,
                role: user.role,
                token: await service.user.getToken(user)
            };
        } else {
            ctx.throw(400, app.constants.ERROR_CODE.LOGIN_FAIL);
        }
    }
    async verifyToken() {
        const { ctx, app, service } = this;
        const token = ctx.header.token;
        ctx.assert(token, 400, 'token not found in headers');
        const user = await service.user.verifyToken(token);
        ctx.body = {
            username: user.username,
            realname: user.realname,
            role: user.role,
            token: await service.user.getToken(user)
        }
    }
}