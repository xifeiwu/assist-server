import { Context } from 'egg';
import { app, mock, assert } from 'egg-mock/bootstrap';

describe('test/app/controller/paas.test.ts', () => {
    let ctx: Context;

    before(async () => {
        ctx = app.mockContext();
    });

    it('outter api test: /login', async () => {
        const casIndentity = `
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
</cas:serviceResponse>`
        process.env.PLATFORM = 'finup:test';
        const resObj = await ctx.curl(`${ctx.service.paas.getPaasServer()}/login`, {
            method: 'POST',
            contentType: 'json',
            data: {
                casLoginInfo: casIndentity
            }
        });
        console.log(resObj.data.toString());
        assert(resObj.status == 200);
        // const result = await app.httpRequest().get('/api/test/connection').expect(200);
        // assert(result.text === 'hi, egg');
    });
});
