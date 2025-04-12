const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user'); 
const config = require('../config/config');
const router = express.Router();



router.post("/login", async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials!" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials!" });
      }
      const token = jwt.sign({user}, config.jwtSecret || 'devJwtSecret')
  
      return res.status(200).json({ message: "Login successful", token: token });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });


// Health check endpoint for Railway deployment
router.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Auth service is running' });
});

module.exports = router;
