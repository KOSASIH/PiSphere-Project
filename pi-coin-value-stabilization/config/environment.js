// config/environment.js
const config = require('./config.json');

const environment = process.env.NODE_ENV || 'development';

const environmentConfig = {
    development: {
        database: {
            url: config.database.url,
            options: {
                ...config.database.options,
                debug: true
            }
        },
        logging: {
            level: 'debug'
        }
    },
    testing: {
        database: {
            url: 'mongodb://localhost:27017/pi_coin_test',
            options: config.database.options
        },
        logging: {
            level: 'warn'
        }
    },
    production: {
        database: {
            url: process.env.DB_URL || config.database.url,
            options: config.database.options
        },
        logging: {
            level: 'error'
        }
    }
};

module.exports = {
    ...config,
    ...environmentConfig[environment]
};
