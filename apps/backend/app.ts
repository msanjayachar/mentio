import authRouter from "./routes/auth";
import mcqSlidesRouter from "./routes/mcq";
import express from "express";
import cors from "cors";
import { middleware } from "./middleware/auth";
import canvasSlidesRouter from "./routes/canvas";
import presentationsRouter from "./routes/presentations";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/slides", middleware, mcqSlidesRouter);
app.use("/canvas", middleware, canvasSlidesRouter);
app.use("/presentations", middleware, presentationsRouter);
