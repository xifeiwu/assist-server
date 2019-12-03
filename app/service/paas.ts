import { Service } from 'egg';

export default class PaasService extends Service {
    getPlatform() {
        var [corp, env] = ['finup', 'development'];
        if (process.env.PLATFORM) {
            [corp, env] = process.env.PLATFORM.split(':');
        }
        return {
            corp, env
        }
    }
    getPaasServer() {
        const { corp, env } = this.getPlatform();
        var serverMap = {
            // development: 'http://10.10.58.126:30334',
            development: 'http://10.10.202.143:30334',
            test: 'http://10.10.202.143:30334',
            production: 'http://galaxy-web-server.galaxy.production',
        };
        if (corp === 'renmai') {
            serverMap = {
                development: 'http://bs.renmaitech.cn',
                test: 'http://bs.renmaitech.cn',
                production: 'http://bs.renmaitech.cn',
            };
        }
        return serverMap[env];
    }
    getCasServer() {
        const { corp, env } = this.getPlatform();
        const CAS_PATH_TEST = 'http://10.10.201.66:8080/puhui-cas';
        const CAS_PATH_PRODUCTION = 'http://cas.finupgroup.com/puhui-cas';
        var serverMap = {
            development: 'http://cas.finupgroup.com/puhui-cas',
            test: 'http://cas.finupgroup.com/puhui-cas',
            production: 'http://cas.info.production/puhui-cas',
        };
        if (corp === 'renmai') {
            serverMap = {
                development: 'http://cas.finupgroup.com/puhui-cas',
                test: 'http://cas.finupgroup.com/puhui-cas',
                production: 'http://cas.finupgroup.com/puhui-cas',
            };
        }
        return serverMap[env];
    }
    getTerminalInfo(profileType, profileName) {
        const { corp, env } = this.getPlatform();
        const results = {
            protocol: 'https',
            host: '',
            port: 30003,
            secretKey: 'CJxYK8Ck', // secretKey for production profile
        };
        if (env && env.startsWith('production')) {
            if (profileType === 'PRODUCTION') {
                results.host = 'pro-k8s-webshell.finupgroup.com';
                results.port = 30001;
            } else {
                results.host = 'test-k8s-webshell.finupgroup.com';
                results.port = 30002;
            }
        } else {
            // NOTICE: 需要在/etc/hosts中添加配置：
            // 10.10.73.131 k8s-webshell.finupgroup.com
            results.host = 'k8s-webshell.finupgroup.com';
            results.port = 30001;
            results.secretKey = 'ERkyNK2Q';
        }
        if (corp === 'renmai') {
            // NOTICE: 需要在/etc/hosts中添加配置：
            // 106.75.71.237 webshell.renmaitech.cn
            // 117.50.4.232 twebshell.renmaitech.cn
            results.secretKey = 'ERkyNK2Q';
            if (env && env.startsWith('production')) {
                if (profileType === 'PRODUCTION') {
                    if (profileName === 'production-ff') {
                        results.host = 'webshell.renmaitech.cn';
                        results.port = 30001;
                    } else {
                        results.host = 'webshell.renmaitech.cn';
                        results.port = 30001;
                    }
                } else {
                    results.host = 'twebshell.renmaitech.cn';
                    results.port = 30001;
                }
            } else {
                return new Error('任买测试环境终端暂未配置');
            }
        }
        return results;
    }
}
