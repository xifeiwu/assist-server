import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
    const config: PowerPartial<EggAppConfig> = {};
    config.sequelize = {
        "username": "assist",
        "password": "localhost__mysql__assist",
        "database": "assist",
        "host": "127.0.0.1",
        "dialect": "mysql",
        // "operatorsAliases": false
    };
    return config;
};
