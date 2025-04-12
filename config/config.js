// Load environment variables first
require('dotenv').config();
const config = require('config');

// MongoDB URI fix - direct access to environment variable
const dbURI = process.env.MONGODB_URI;

// Basic configuration with environment variables prioritized
const appConfig = {
    dbURI: dbURI, // Direct from environment
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV || 'development'
};

// Debugging information
console.log(`Environment: ${appConfig.nodeEnv}`);
console.log(`Port: ${appConfig.port}`);
console.log(`MongoDB URI is ${appConfig.dbURI ? 'set' : 'NOT SET'}`);
if (appConfig.dbURI) {
    console.log(`MongoDB URI format check: ${appConfig.dbURI.startsWith('mongodb://') || appConfig.dbURI.startsWith('mongodb+srv://') ? 'valid' : 'INVALID FORMAT'}`);
}

module.exports = appConfig;
