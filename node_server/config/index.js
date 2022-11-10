const bunyan = require('bunyan');

const pjs = require('../package.json');

const { name, version } = pjs;

const getLogger =
    (serviceName, serviceVersion, level) =>
        bunyan.createLogger({ name: `${serviceName}: ${serviceVersion}`, level });

const config = {
    development: {
        name,
        version,
        timeout: 30,
        log: () => getLogger(name, version, 'debug')
    },
    production: {
        name,
        version,
        timeout: 30,
        log: () => getLogger(name, version, 'info')
    },
    test: {
        name,
        version,
        timeout: 30,
        log: () => getLogger(name, version, 'fatal')
    }
};

module.exports = config;