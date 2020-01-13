import { EggAppConfig, EggAppInfo, PowerPartial, ClusterOptions } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '20200113';
  // secret key for project
  config.secret = appInfo.name + '_KcH0+LIP0HbuOvVwxHaZtBWSS';

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
      ctx.status = err.status ? err.status : 200;
      if (ctx.status == 200) {
        /**
          {
            success: false
            t: 1578881876483
            msg: "userName is needed"
          }
         */
        ctx.body = {
          success: false,
          t: Date.now(),
          msg: err.message,
        };
      } else {
        // [restful format ref](https://eggjs.org/zh-cn/tutorials/restful.html)
        ctx.body = {
          error: err.message
        }
      }
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
