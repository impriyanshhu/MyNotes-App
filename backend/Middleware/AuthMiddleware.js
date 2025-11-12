import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: 'No token, access denied' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token, access denied' });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ msg: "No user found" });

    req.user = { fullName: user.fullName, id: user._id };
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default authMiddleware;
