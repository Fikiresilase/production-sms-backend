// Load environment variables first
require('dotenv').config();
const config = require('config');

// Debug all environment variables
console.log('Available environment variables:');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`DB_URI env var present: ${process.env.DB_URI ? 'YES' : 'NO'}`);

// Determine the DB URI with multiple fallbacks
let dbURI;

// Try direct environment variable first (Railway preference)
try {
    dbURI = process.env.DB_URI;
    if (!dbURI) {
        console.log('DB_URI not found in process.env, trying alternate names');
        // Try alternate variable names that might be set in Railway
        dbURI = process.env.MONGODB_URI || process.env.DATABASE_URL || process.env.MONGO_URL;
    }

    // If still not found, try config module
    if (!dbURI && config.has('dbURI')) {
        console.log('Using dbURI from config module');
        dbURI = config.get('dbURI');
    }

    // Hard-coded fallback if necessary (for local dev only)
    if (!dbURI) {
        console.warn('⚠️ WARNING: No MongoDB URI found in any environment variable!');
        console.warn('⚠️ Using default local MongoDB URI for development only');
        dbURI = 'mongodb://127.0.0.1:27017/sms_db';
    }

    console.log(`Final MongoDB URI (first few chars): ${dbURI ? dbURI.substring(0, 15) + '...' : 'UNDEFINED'}`);
} catch (error) {
    console.error('Error setting up database URI:', error);
}

// Basic configuration with detailed fallbacks
const appConfig = {
    dbURI: dbURI || 'mongodb://127.0.0.1:27017/sms_db', // Ensure it's never undefined
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'dev_secret_key',
    nodeEnv: process.env.NODE_ENV || 'development'
};

// Comprehensive debugging information
console.log('=== App Configuration ===');
console.log(`Environment: ${appConfig.nodeEnv}`);
console.log(`Port: ${appConfig.port}`);
console.log(`MongoDB URI is ${appConfig.dbURI ? 'set' : 'NOT SET'}`);
if (appConfig.dbURI) {
    console.log(`MongoDB URI format check: ${appConfig.dbURI.startsWith('mongodb://') || appConfig.dbURI.startsWith('mongodb+srv://') ? 'valid' : 'INVALID FORMAT'}`);
}

module.exports = appConfig;
