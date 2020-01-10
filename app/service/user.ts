// import crypto from crypto;
const crypto = require('crypto');
import { Service } from 'egg';

export default class UserService extends Service {
    async userCheck(userName: string, password: string) {
        const {app, ctx} = this;
        const passwordSha256 = crypto.createHmac('sha256', app.config.key).update(password).digest('base64');
        const user = await ctx.model.User.findOne({
            where: { userName, passwordSha256 },
            attributes: ['id', 'username', 'role']
        });
        return user;
    }
    async getToken() {

    }
    async verifyToken(token: string) {

    }
    async getUser(obj) {
        const { app, ctx } = this;
        const user = await ctx.model.User.findOne({
            where: obj,
            attributes: ['id', 'username', 'role']
        });
        return user;
    }
}