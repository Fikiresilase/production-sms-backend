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
app.use(express.json());
app.use(cors());

// Connect to MongoDB using the URI from config
mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        console.error('Please check your MONGODB_URI environment variable in Railway');
        process.exit(1);
    });





app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/grade', gradeRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/schedule', scheduleRoutes);

app.use(errorHandler)

const port = process.env.PORT || config.port;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port} in ${config.nodeEnv} mode.`);
});