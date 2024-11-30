const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config');
const errorHandler = require('./middleware/errorHandler');

const {
    studentRoutes,
    teacherRoutes,
    parentRoutes,
    schoolRoutes,
    branchRoutes,
    courseRoutes,
    gradeRoutes,
    adminRoutes,
    registerRoutes,
    scheduleRoutes
} = require('./routes'); 

const app = express();


mongoose.connect(config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });


app.use(express.json());
app.use(cors());

app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/school/branch', branchRoutes);
app.use('/api/school', schoolRoutes);
app.use('/api/branch/admin', adminRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/grade', gradeRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/schedule', scheduleRoutes);

app.use(errorHandler)

const port = config.port;
app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${config.nodeEnv} mode.`);
});