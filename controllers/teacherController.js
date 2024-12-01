const { Teacher } = require('../models/teacher');

exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving teachers', error: err.message });
    }
};


exports.getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(teacher);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving teacher', error: err.message });
    }
};

exports.createTeacher = async (req, res) => {
    try {
        const teacher = new Teacher({
            name: req.body.name,
            email: req.body.email,
            grade: req.body.grade,
            section: req.body.section,
            password: req.body.password,
            parent: req.body.parent,
        });

        const addedTeacher = await teacher.save();
        res.status(201).json(addedTeacher);
    } catch (err) {
        res.status(500).json({ message: 'Error adding teacher', error: err.message });
    }
};

exports.updateTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        if (req.body.name) teacher.name = req.body.name;
        if (req.body.email) teacher.email = req.body.email;
        if (req.body.password) teacher.password = req.body.password;
        if (req.body.grade) teacher.grade = req.body.grade;

        const updatedTeacher = await teacher.save();
        res.json(updatedTeacher);
    } catch (err) {
        res.status(500).json({ message: 'Error updating teacher', error: err.message });
    }
};

exports.deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndDelete(req.params.id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json({ message: 'Teacher deleted', teacher });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting teacher', error: err.message });
    }
};
