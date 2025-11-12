import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authMiddleware from '../Middleware/AuthMiddleware.js';

const router = express.Router();

dotenv.config();

router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(401).json({ success: false, message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullName, email, password: hashedPassword
        })

        await newUser.save();

        return res.status(200).json({ success: true, message: "Account created successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" })
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );


        return res.status(200).json({ success: true, token, user: { fullName: user.fullName, _id: user._id }, message: "Login successfully" })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" })
    }
})

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});


export default router;