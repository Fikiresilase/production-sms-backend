const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { Student } = require('../models/student');
const {Teacher}=require('../models/teacher')
const router = express.Router();

router.post(
  '/student',
  
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('section').notEmpty().withMessage('Section is required'),
    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
      .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
      .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
      .matches(/\d/).withMessage('Password must contain at least one number')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character'),
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, section, password } = req.body;

    try {
      
      let student = await Student.findOne({ email });
      if (student) {
        return res.status(400).json({ msg: 'Student already exists' });
      }

  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

     
      student = new Student({
        name,
        email,
        section,
        password: hashedPassword,
      });

      await student.save();

      res.status(201).json({ msg: 'Student registered successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
)
 

router.post(
  '/teacher',
  [
    body('firstName').notEmpty().withMessage('Name is required'),
    body('lastName').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
   
  ],
  async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email } = req.body;
    

    try {
      let teacher = await Teacher.findOne({ email });
      if (teacher) {
        return res.status(400).json({ msg: 'Teacher already exists' });
      }
      
      const password="123456"
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      teacher = new Teacher({
        name:firstName + " " + lastName,
        email,
        password: hashedPassword,
        
      });

      await teacher.save();
     

      res.status(201).json({ msg: 'Teacher registered successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);




module.exports = router;
