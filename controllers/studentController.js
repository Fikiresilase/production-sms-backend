const { Student } = require('../models/student');
const { Teacher } = require('../models/teacher');
const { Parent } = require('../models/parent');

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving students', error: err.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).sort({ name: 1 });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving student', error: err.message });
    }
};

exports.getStudentsByGradeAndSection = async (req, res) => {
    try {
        const students = await Student.find({ grade: req.params.grade, section: req.params.section }).sort({ name: 1 });
        if (!students) {
            return res.status(404).json({ message: 'No students found' });
        }
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving students', error: err.message });
    }
};

exports.getStudentsByTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.teacherId);
        const teacherGrade = teacher.grade.map(g => g.name);
        const { grade, section, course } = req.query;

        let students;
        if (!(grade || section || course)) {
            students = await Student.find({ 'grade.name': { $in: teacherGrade } });
        } else if (grade && section && course) {
            students = await Student.find({ 'grade.name': grade, section: section, course: { $elemMatch: { name: course } } });
        } else {
   
            students = await Student.find().or([
                { 'grade.name': grade },
                { section: section },
                { course: { $elemMatch: { name: course } } }
            ]);
        }

        if (!students) {
            return res.status(404).json({ message: 'No students found for the given filters' });
        }
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving students by teacher', error: err.message });
    }
};

exports.getParentById = async (req, res) => {
    try {
        const parent = await Parent.findById(req.params.id);
        if (!parent) {
            return res.status(404).json({ message: 'Parent not found' });
        }
        res.json(parent);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving parent', error: err.message });
    }
};

exports.createStudent = async (req, res) => {
    try {
        const student = new Student({
            name: req.body.name,
            email: req.body.email,
            grade: req.body.grade,
            section: req.body.section,
            password: req.body.password,
            parent: req.body.parent,
        });

        const addedStudent = await student.save();
        res.status(201).json(addedStudent);
    } catch (err) {
        res.status(500).json({ message: 'Error adding student', error: err.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).sort({ name: 1 });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        if (req.body.name) student.name = req.body.name;
        if (req.body.email) student.email = req.body.email;
        if (req.body.grade) student.grade = req.body.grade;
        if (req.body.section) student.section = req.body.section;
        if (req.body.parent) student.parent = req.body.parent;
        if (req.body.password) student.password = req.body.password;

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(500).json({ message: 'Error updating student', error: err.message });
    }
};

exports.updateStudentCourseGrade = async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { _id: req.params.studentId, 'course.name': req.params.courseName },
            { $set: { 'course.$.grade': parseInt(req.body.grade) } },
            { new: true }
        );
        if (!student) {
            return res.status(404).json({ message: 'Student or course not found' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: 'Error updating course grade', error: err.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted', student });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting student', error: err.message });
    }
};
