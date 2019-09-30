import { Controller } from 'egg';

export default class PaasController extends Controller {
    public async index() {
        const { ctx } = this;
        // this.app.config
        // this.ctx.curl()
        ctx.body = await ctx.service.test.sayHi('egg');
    }
    async casIndentify() {
        const { ctx, service } = this;
        const body = ctx.request.body;
        const CAS_PATH = service.paas.getCasServer();
        const url = `${CAS_PATH}/serviceValidate?service=${body.service}&ticket=${body.ticket}`;
        const resData = await ctx.axios.requestData({ url });
        const xmlLineList = resData.split('\n').filter(it => {
            return it.trim();
        });
        const formattedXmlLineList = xmlLineList.map(it => {
            it = it.replace(/(<\/?)cas:/g, '$1');
            it = it.replace(/<!--.*?-->/g, '');
            it = it.trim();
            return it;
        }).filter(it => {
            return it;
        });
        // console.log(formattedXmlLineList);
        // console.log(formattedXmlLineList.join(''));
        const formatOfJson = await new Promise(resolve => {
            require('xml2js').parseString(formattedXmlLineList.join(''), (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });

        ctx.body = ctx.wrapBody({
            json: formatOfJson,
            xml: xmlLineList.join('\n'),
        });
    }
    async token4Terminal() {
        const { ctx, service } = this;
        const { podNs, podName, containerName, token, userName, profileType, profileName } = ctx.request.body;
        const terminalServerInfo = service.paas.getTerminalInfo(profileType, profileName);
        if (terminalServerInfo instanceof Error) {
            return ctx.throw(200, terminalServerInfo.message);
        }
        const permissionList = (await ctx.axios.requestData({
            path: `${service.paas.getPaasServer()}/user/roles/permissions?exclude=true`,
            method: 'get',
            headers: {
                token,
            },
        })).content;
        if (!Array.isArray(permissionList)) {
            ctx.throw(200, 'request /user/roles/permissions?exclude=true fail');
        }

        // /2.x/instances/openTerminal
        const payload = {
            secretKey: terminalServerInfo.secretKey,
            paasUser: userName,
            podNs,
            podName,
            containerName,
        };
        const url = `${terminalServerInfo.protocol}://${terminalServerInfo.host}:${terminalServerInfo.port}/auth`;
        const teminalServerResData = await ctx.axios.requestData({
            url,
            method: 'post',
            data: payload,
        });

        ctx.body = ctx.wrapBody({
            token: teminalServerResData.data.token,
            host: terminalServerInfo.host,
            port: terminalServerInfo.port,
        });
    }
}
