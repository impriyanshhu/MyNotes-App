import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
import authRouter from './routes/Auth.js';
import noteRoutes from './routes/NoteRoutes.js';

dotenv.config();

connectDB();

const app = express();

const allowedOrigins = [
  "https://mynotesflow.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/mynotes', noteRoutes);

app.get('/', (req, res) => {
  res.send("API is working");
});

export default app;
