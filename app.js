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

mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
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
app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${config.nodeEnv} mode.`);
});