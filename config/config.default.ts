import { EggAppConfig, EggAppInfo, PowerPartial, ClusterOptions } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.key = appInfo.name + '_KcH0+LIP0HbuOvVwxHaZtBWSS';

  // add your egg config in here
  config.middleware = ['filter'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.cluster = {
    listen: {
      port: 6003,
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.onerror = {
    json(err, ctx) {
      if (!(err instanceof Error)) {
        err = new Error(`non-error thrown: ${err}`);
      }
      // json hander
      ctx.body = {
        success: false,
        t: Date.now(),
        msg: err.message,
      };
      ctx.status = err.status ? err.status : 200;
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
