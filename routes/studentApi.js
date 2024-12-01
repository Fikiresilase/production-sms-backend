// routes/studentApi.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.get('/grade/:grade/:section', studentController.getStudentsByGradeAndSection);
router.get('/teacher/:teacherId', studentController.getStudentsByTeacher);
router.get('/parent/:id', studentController.getParentById);
router.post('/', studentController.createStudent);
router.put('/:id', studentController.updateStudent);
router.put('/:studentId/course/:courseName', studentController.updateStudentCourseGrade);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
