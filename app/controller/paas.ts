import { Controller } from 'egg';

export default class PaasController extends Controller {
    public async index() {
        const { ctx } = this;
        // this.app.config
        // this.ctx.curl()
        ctx.body = await ctx.service.test.sayHi('egg');
    }

    // 获取cas认证信息
    async casIndentify() {
        const { ctx, service } = this;
        const body = ctx.request.body;
        const CAS_PATH = service.paas.getCasServer();
        const url = `${CAS_PATH}/serviceValidate?service=${body.service}&ticket=${body.ticket}`;
        const casResInXmlFormat = (await ctx.curl(url)).data.toString();
        /** origin format of casResInXmlFormat
         "



<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>
  <cas:authenticationSuccess>
    <cas:user>wuxifei</cas:user>
    <!--添加属性Begin-->

      <cas:attributes>

          <cas:mail>wuxifei@finupgroup.com</cas:mail>

          <cas:hrStatus>A</cas:hrStatus>

          <cas:employeeNo>018750</cas:employeeNo>

          <cas:deptId>FP0011558</cas:deptId>

          <cas:department>云平台</cas:department>

          <cas:title>开发工程师</cas:title>

          <cas:name>吴西飞</cas:name>

          <cas:phone>15712872803</cas:phone>

          <cas:pwdLastSet>132192343525455906</cas:pwdLastSet>

      </cas:attributes>

    <!--添加属性End-->


  </cas:authenticationSuccess>
</cas:serviceResponse>"
         */
        const xmlLineList = casResInXmlFormat.split('\n').filter(it => {
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
        const formatOfJson = await new Promise(resolve => {
            require('xml2js').parseString(formattedXmlLineList.join(''), (err, result) => {
                if (err) {
                    resolve(err);
                } else {
                    resolve(result);
                }
            });
        });
        ctx.body = ctx.ordinaryFormat({
            json: formatOfJson,
            xml: xmlLineList.join('\n'),
        });
    }

    // 获取cas认证信息，并使用这些信息登录paas平台，获取用户信息
    async paasLoginWithCasIndentity() {
        const { ctx, service } = this;
        const body = ctx.request.body;
        const CAS_PATH = service.paas.getCasServer();
        const url = `${CAS_PATH}/serviceValidate?service=${body.service}&ticket=${body.ticket}`;
        const casIndentityInFormatXml = (await ctx.curl(url)).data.toString();
        /** origin format of casIndentityInFormatXml
         "



<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>
  <cas:authenticationSuccess>
    <cas:user>wuxifei</cas:user>
    <!--添加属性Begin-->

      <cas:attributes>

          <cas:mail>wuxifei@finupgroup.com</cas:mail>

          <cas:hrStatus>A</cas:hrStatus>

          <cas:employeeNo>018750</cas:employeeNo>

          <cas:deptId>FP0011558</cas:deptId>

          <cas:department>云平台</cas:department>

          <cas:title>开发工程师</cas:title>

          <cas:name>吴西飞</cas:name>

          <cas:phone>15712872803</cas:phone>

          <cas:pwdLastSet>132192343525455906</cas:pwdLastSet>

      </cas:attributes>

    <!--添加属性End-->


  </cas:authenticationSuccess>
</cas:serviceResponse>"
         */
        const resObj = await ctx.curl(`${service.paas.getPaasServer()}/login`, {
            method: 'POST',
            contentType: 'json',
            data: {
                casLoginInfo: casIndentityInFormatXml
            }
        });
        ctx.status = resObj.status;
        for (let key in resObj.headers) {
            ctx.set(key, resObj.headers[key]);
        }
        ctx.body = resObj.data;
    }

    // 获取用于实例终端的相关信息
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

        ctx.body = ctx.ordinaryFormat({
            token: teminalServerResData.data.token,
            host: terminalServerInfo.host,
            port: terminalServerInfo.port,
        });
    }
}
