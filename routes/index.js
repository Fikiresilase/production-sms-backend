const studentRoutes = require('./studentApi');
const teacherRoutes = require('./teacherApi');
const parentRoutes = require('./parentApi');
const schoolRoutes = require('./schoolApi');
const branchRoutes = require('./api/branchApi');
const courseRoutes = require('./courseApi');
const gradeRoutes = require('./gradeApi');
const adminRoutes = require('./adminApi');
const registerRoutes = require('./registerApi');
const scheduleRoutes = require('./scheduleApi');

module.exports = {
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
};
