const crypto = require('crypto');
import { Controller } from 'egg';

export default class UserController extends Controller {
    async login() {
        const { ctx, app, service } = this;
        const { userName, password } = ctx.request.body;
        ctx.assert(userName, 400, 'userName is needed');
        ctx.assert(password, 400, 'password is needed');
        const passwordSha256 = crypto.createHmac('sha256', app.config.key).update(password).digest('base64');
        const user = await service.user.getUser({ userName, passwordSha256 });
        ctx.status = 200;
        ctx.body = user;
    }
}