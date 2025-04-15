const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const errorHandler = require('./middleware/errorHandler');

const {
    authRoutes,
    studentRoutes,
    teacherRoutes,
    parentRoutes,
    courseRoutes,
    gradeRoutes,
    registerRoutes,
    scheduleRoutes
} = require('./routes'); 

const app = express();

// Configure CORS to allow your frontend
app.use(cors({
    origin: 'https://sms-frontend-coral.vercel.app', // Allow this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true // Support cookies/auth headers if needed
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(config.dbURI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        console.error('Please check your MONGODB_URI environment variable in Railway');
        process.exit(1);
    });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/grade', gradeRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/schedule', scheduleRoutes);

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || config.port;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port} in ${config.nodeEnv} mode.`);
});