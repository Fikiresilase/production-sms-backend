const mongoose = require('mongoose');
const config = require('config'); 

const connectDB = async () => {
    try {
        
        const dbURI = config.get('dbURI');
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Connection to database failed:", err);
        process.exit(1); 
    }
};

module.exports = connectDB;
