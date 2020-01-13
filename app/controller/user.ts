const crypto = require('crypto');
import { Controller } from 'egg';

export default class UserController extends Controller {
    async login() {
        const { ctx, app, service } = this;
        const { userName, password } = ctx.request.body;
        ctx.assert(userName, 400, 'userName is needed');
        ctx.assert(password, 400, 'password is needed');
        const passwordSha256 = crypto.createHmac('sha256', app.config.secret).update(password).digest('base64');
        const user = await service.user.getUser({ userName, passwordSha256 });
        if (user) {
            ctx.status = 200;
            ctx.body = {
                username: user.username,
                role: user.role,
                token: await service.user.getToken(user)
            };
        } else {
            ctx.throw(400, app.constants.ERROR_CODE.LOGIN_FAIL);
        }
    }
    // async tokenCheck() {
    //     const { ctx, app, service } = this;
    //     ctx.user = service.user.verifyToken();
    // }
}