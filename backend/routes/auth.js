const express = require('express');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const { User } = require('../db');

const JWT_SECRET =  "your-jwt-secret";


const router = express.Router();

const signupSchema = z.object({
  firstname: z.string(),
  username: z.string().min(3),
  password: z.string().min(4),
  role: z.enum(['ca', 'client'])
});

const signinSchema = z.object({
  username: z.string(),
  password: z.string()
});

// POST /auth/signup
router.post('/signup', async (req, res) => {
  try {
    const data = signupSchema.parse(req.body);

    const existing = await User.findOne({ username: data.username });
    if (existing) {
      return res.status(409).json({ msg: 'Username exists' });
    }

    const user = await User.create(data);
    const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET);
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// POST /auth/signin
router.post('/signin', async (req, res) => {
  try {
    const data = signinSchema.parse(req.body);

    const user = await User.findOne({ username: data.username });
    if (!user || user.password !== data.password) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET);
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
