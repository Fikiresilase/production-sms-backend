const config = require('config');

// Function to safely get config with fallback to environment variables
const safeGet = (key, envKey) => {
    try {
        return config.has(key) ? config.get(key) : process.env[envKey];
    } catch (error) {
        return process.env[envKey];
    }
};

const appConfig = {
    // Always check direct environment variables as fallback
    dbURI: process.env.MONGODB_URI || safeGet('dbURI', 'MONGODB_URI'),
    port: process.env.PORT || safeGet('port', 'PORT') || 3000,
    jwtSecret: process.env.JWT_SECRET || safeGet('jwtSecret', 'JWT_SECRET'),
    nodeEnv: process.env.NODE_ENV || safeGet('nodeEnv', 'NODE_ENV') || 'development'
};

// Log config for debugging (excluding sensitive values)
console.log(`Environment: ${appConfig.nodeEnv}`);
console.log(`Port: ${appConfig.port}`);
console.log(`MongoDB URI is ${appConfig.dbURI ? 'set' : 'NOT SET'}`);

module.exports = appConfig;
