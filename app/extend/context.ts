import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface ExtendConfig extends AxiosRequestConfig {
    path?: string;
    query?: string;
}

class AxiosHelper {
    instance: AxiosInstance;
    constructor(instanceConfig: AxiosRequestConfig) {
        this.instance = Axios.create(Object.assign({
            timeout: 30000
        }, instanceConfig));
    }

    async requestAxiosResponse(config: ExtendConfig) {
        config.url = config.url ? config.url : config.path;
        if (!config.url) {
            throw new Error('参数不完整');
        }
        if (config.params && config.url) {
            Object.keys(config.params).forEach(key => {
                config.url = config.url ? config.url.replace('{' + key + '}', config.params[key]) : config.url;
            });
        }
        config.params = config.query;
        return await this.instance.request(config);
    }

    async requestData(config: ExtendConfig) {
        const axiosResponse = await this.requestAxiosResponse(config);
        const resData = axiosResponse.data;
        return resData;
    }
}

export default {
    AxiosHelper,
    axios: new AxiosHelper({}),
    // wrapper for response content
    ordinaryFormat(content) {
        return {
            success: true,
            content,
            t: Date.now(),
        };
    },
};
