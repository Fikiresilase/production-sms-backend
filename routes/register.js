const config=require('config')
const express = require("express");
const bcrypt = require('bcryptjs');
const User = require("../models/user");
const Student = require("../models/student");
const Parent = require("../models/parent");
const Teacher = require("../models/teacher");
const jwt= require('jsonwebtoken')

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);

  try {
    if (req.body.student) {
      
      const { studentName, studentEmail, studentPassword, studentSection, studentGrade } = req.body.student;
      const { parentName, parentEmail, parentPassword } = req.body.parent;

      const existingUser = await User.findOne({ email: studentEmail });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }

      const hashedStudentPassword = await bcrypt.hash(studentPassword, 10);
      const hashedParentPassword = await bcrypt.hash(parentPassword, 10);

      const studentUser = new User({
        name: studentName,
        email: studentEmail,
        password: hashedStudentPassword,
        role: "student",
      });

      const parentUser = new User({
        name: parentName,
        email: parentEmail,
        password: hashedParentPassword,
        role: "parent",
      });

      await studentUser.save();
      await parentUser.save();

      const student = new Student({
        name: studentName,
        section: studentSection,
        grade: studentGrade,
        user: studentUser._id,
      });

      const parent = new Parent({
        name: parentName,
        user: parentUser._id,
      });

      await student.save();
      await parent.save();

      return res.status(201).json({ message: "Student and Parent registered successfully!" });

    } else if (req.body.teacher) {
      
      const { teacherName, teacherEmail, teacherPassword } = req.body.teacher;

      const existingUser = await User.findOne({ email: teacherEmail });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
      }

      const hashedTeacherPassword = await bcrypt.hash(teacherPassword, 10);

      const teacherUser = new User({
        name: teacherName,
        email: teacherEmail,
        password: hashedTeacherPassword,
        role: "teacher",
      });

      await teacherUser.save();

      const teacher = new Teacher({
        name: teacherName,
        _id: teacherUser._id,
      });

      await teacher.save();

      return res.status(201).json({ message: "Teacher registered successfully!" });
    } 

    return res.status(400).json({ message: "Invalid request data!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  } 
});



module.exports = router;
