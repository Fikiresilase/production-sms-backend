const config = require('config');
const appConfig = {
    dbURI: config.get('dbURI'),
    port: config.get('port'),
    jwtSecret: config.get('jwtSecret'),
    nodeEnv: config.get('nodeEnv')
}

module.exports = appConfig;
