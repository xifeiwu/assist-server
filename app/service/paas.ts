import { Service } from 'egg';

export default class PaasService extends Service {
    getPaasServer() {
        const NODE_ENV = process.env.NODE_ENV as string;
        let server = 'http://10.10.202.143:30334';
        const serverMap = {
            dev: 'http://10.10.58.126:30334',
            test: 'http://10.10.202.143:30334',
            production: 'http://galaxy-web-server.galaxy.production',
        };
        if (serverMap.hasOwnProperty(NODE_ENV)) {
            server = serverMap[NODE_ENV];
        }
        return server;
    }
    getCasServer() {
        const CAS_PATH_TEST = 'http://10.10.201.66:8080/puhui-cas';
        const CAS_PATH_PRODUCTION = 'http://cas.finupgroup.com/puhui-cas';
        const NODE_ENV = process.env.NODE_ENV as string;
        let casServer = 'http://cas.finupgroup.com/puhui-cas';
        const serverMap = {
            production: 'http://cas.info.production/puhui-cas',
        };
        if (serverMap.hasOwnProperty(NODE_ENV)) {
            casServer = serverMap[NODE_ENV];
        }
        return casServer;
    }
    getTerminalInfo(profileType, profileName) {
        const results = {
            protocol: 'https',
            host: '',
            port: 30003,
            secretKey: 'CJxYK8Ck', // secretKey for production profile
        };
        const NODE_ENV = process.env.NODE_ENV;
        if (NODE_ENV && NODE_ENV.startsWith('production')) {
            if (profileType === 'PRODUCTION') {
                if (profileName === 'production-ff') {
                    results.host = 'ff-k8s-webshell.finupgroup.com';
                    results.port = 30003;
                } else {
                    results.host = 'pro-k8s-webshell.finupgroup.com';
                    results.port = 30001;
                }
            } else {
                results.host = 'test-k8s-webshell.finupgroup.com';
                results.port = 30002;
            }
        } else {
            results.host = 'k8s-webshell.finupgroup.com';
            results.port = 30001;
            results.secretKey = 'ERkyNK2Q';
        }
        return results;
    }
}
