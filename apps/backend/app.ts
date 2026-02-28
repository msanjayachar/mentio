import authRouter from "./routes/auth";
import mcqSlidesRouter from "./routes/mcq";
import express from "express";
import cors from "cors";
export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/auth", mcqSlidesRouter);
