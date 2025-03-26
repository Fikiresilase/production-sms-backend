const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user'); 
const router  = express.Router()


const JWT_SECRET = 'jwtSecret'



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
      const token= jwt.sign({user},config.get("jwtSecret"))
  
      return res.status(200).json({ message: "Login successful", token: token });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });


module.exports = router;
