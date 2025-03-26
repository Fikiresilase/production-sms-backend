const authRoutes = require('./authApi');
const studentRoutes = require('./studentApi');
const teacherRoutes = require('./teacherApi');
const parentRoutes = require('./parentApi');
const courseRoutes = require('./courseApi');
const gradeRoutes = require('./gradeApi');
const adminRoutes = require('./adminApi');
const registerRoutes = require('./register'); 
const scheduleRoutes = require('./scheduleApi');

module.exports = {
    authRoutes,
    studentRoutes,
    teacherRoutes,
    parentRoutes,
    courseRoutes,
    gradeRoutes,
    adminRoutes,
    registerRoutes,
    scheduleRoutes
};
