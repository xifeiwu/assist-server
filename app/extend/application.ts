const NodeUtils = require('./utils/node.js');

export default {
    utils: new NodeUtils(),
    constants: {
        ERROR_CODE: {
            LOGIN_FAIL: '登录失败（用户名或密码错误）',
            TOKEN_VERIFY_FAIL: 'token认证失败',
        }
    },
}