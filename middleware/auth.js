const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Teacher } = require('../models/teacher'); 
const router = express.Router();


const JWT_SECRET = ' '; 


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const teacher = await Teacher.findOne({ email });
        if (!teacher) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

       
        const isPasswordValid = await bcrypt.compare(password, teacher.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: teacher._id, email: teacher.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1] ; 
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.teacher = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Access granted', teacher: req.teacher });
});

module.exports = router;
