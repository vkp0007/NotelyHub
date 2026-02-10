import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { databaseConnection } from './util/dbConnection.js';
import authRoutes from './routes/authRoutes.js';
import pageRoutes from './routes/pageRoutes.js';

dotenv.config({ path: '.env' });

const app = express();

// ✅ FIXED CORS
app.use(
  cors({
    origin: "https://notelyapplication.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
app.use(async (req, res, next) => {
  try {
    await databaseConnection();
    next();
  } catch (err) {
    console.error("❌ DB Connection failed:", err.message);
    res.status(500).json({ message: "Database connection error" });
  }
});

app.get('/', (req, res) => {
  res.send('API is running and DB is connected!');
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pages", pageRoutes);
export default app;
