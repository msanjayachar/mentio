import authRouter from "./routes/auth";
import mcqSlidesRouter from "./routes/mcq";
import express from "express";
import cors from "cors";
import { middleware } from "./middleware/auth";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/slides", middleware, mcqSlidesRouter);
