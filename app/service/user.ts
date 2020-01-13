// import crypto from crypto;
const crypto = require('crypto');
import { Service, IModel } from 'egg';

export default class UserService extends Service {
    // TODO: not used
    async userCheck(userName: string, password: string) {
        const {app, ctx} = this;
        const passwordSha256 = crypto.createHmac('sha256', app.config.secret).update(password).digest('base64');
        const user = await ctx.model.User.findOne({
            where: { userName, passwordSha256 },
            attributes: ['id', 'username', 'role']
        });
        return user;
    }
    async getUser(obj) {
        const { app, ctx } = this;
        const user = await ctx.model.User.findOne({
            where: obj,
            // attributes: ['id', 'username', 'role']
        });
        return user;
    }
    async getToken(user, timeout: number = 2 * 24 * 3600 * 1000) {
        const { app, ctx } = this;
        const cipher = crypto.createCipher('aes256', app.config.secret);
        const base64 = Buffer.from(JSON.stringify({
            id: user.id,
            username: user.username,
            exp: Date.now() + timeout
        })).toString('base64');
        const token = [cipher.update(base64, 'base64', 'base64'), cipher.final('base64')].join('');
        return token;
    }
    async verifyToken(token: string) {
        const { app, ctx } = this;
        const decipher = crypto.createDecipher('aes256', app.config.secret);
        var user: any = null;
        try {
            const tokenInfo = JSON.parse([decipher.update(token, 'base64', 'utf8'), decipher.final('utf8')].join(''));
            // console.log(tokenInfo);
            ctx.assert(tokenInfo, 400, app.constants.ERROR_CODE.TOKEN_VERIFY_FAIL);
            ctx.assert(tokenInfo.exp > Date.now(), 400, app.constants.ERROR_CODE.TOKEN_VERIFY_FAIL);
            ctx.assert(tokenInfo.id, 400, app.constants.ERROR_CODE.TOKEN_VERIFY_FAIL);
            ctx.assert(tokenInfo.username, 400, app.constants.ERROR_CODE.TOKEN_VERIFY_FAIL);
            user = await this.getUser({
                id: tokenInfo.id,
                username: tokenInfo.username
            });
            // console.log(user);
            ctx.assert(user, 400, app.constants.ERROR_CODE.TOKEN_VERIFY_FAIL);
        } catch (err) {
            if (!err.status) {
                err.status = 400;
            }
            throw err;
        }
        return user;
    }
}