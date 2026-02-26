import authRouter from "./routes/auth";
import express from "express";
export const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
