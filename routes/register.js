
const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const { Student } = require('../models/student'); 

const router = express.Router();


router.post(
  '/register',
  [
    
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('grade').isNumeric().withMessage('Grade must be a number'),
    body('section').matches(/^[A-Z]+$/).withMessage('Section should be a single uppercase letter'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  async (req, res) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, grade, section, password, parent } = req.body;

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
        grade: {
          id: new mongoose.Types.ObjectId(),
          name: grade,
        },
        section,
        password: hashedPassword,
        parent, 
      });

      await student.save();

      res.status(201).json({ msg: 'Student registered successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
