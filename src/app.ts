import express from "express";
import healthRouter from "./routes/health.routes";
import authRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.ORIGIN_URL || "http://localhost:3000",
  credentials: true,
}));

app.use(cookieParser());

app.use(healthRouter);
app.use(authRouter);

export default app;
