import { Router } from "express";
import { createUser, getUser, getUserByUserId } from "../queries/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { middleware } from "../middleware/auth";
import { Request, Response } from "express";
import { SignupUser, LoginUser } from "../../../packages/shared/src/auth";

const authRouter = Router();
const saltRounds = 10;
const secret = process.env.SECRET;

authRouter.get("/me", middleware, async (req: Request, res: Response) => {
  const { userId } = req.user;
  let user;

  try {
    user = await getUserByUserId(userId);
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: null,
      error: "UNAUTHORIZED",
    });
  }

  const finalUser = {
    userId: user.id,
    name: user.name,
    email: user.email,
  };

  return res.status(200).json({
    success: true,
    data: finalUser,
    error: null,
  });
});

authRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const { email, name, password } = body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  let parsed;
  try {
    parsed = SignupUser.parse({ name, email, password });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "INVALID_REQUEST",
    });
  }

  console.log("*************************");
  console.log("parsed: ", parsed);
  console.log("*************************");

  if (!parsed) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "UNABLE_TO_CREATE_USER",
    });
  }

  let user;
  try {
    user = await createUser(parsed.email, parsed.name, hashedPassword);
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "UNABLE_TO_CREATE_USER",
    });
  }

  const finalUser = {
    userId: user.id,
    name: user.name,
    email: user.email,
  };

  return res.status(200).json({
    success: true,
    data: finalUser,
    error: null,
  });
});

authRouter.post("/login", async (req, res) => {
  const body = req.body;
  const { email, password } = body;

  let parsed;
  try {
    parsed = LoginUser.parse({ email, password });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "INVALID_REQUEST",
    });
  }

  if (!parsed) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "INVALID_REQUEST",
    });
  }

  let user;
  try {
    user = await getUser(parsed.email);
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "INVALID_CREDENTIALS",
    });
  }

  if (!secret) throw new Error("SECRET key is missing");

  if (!user) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "INVALID_CREDENTIALS",
    });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "INVALID_CREDENTIALS",
    });
  }

  const JWT_TOKEN = jwt.sign(
    {
      userId: user.id,
    },
    secret,
    { expiresIn: 60 * 60 },
  );

  const finalUser = {
    userId: user.id,
    name: user.name,
    email: user.email,
  };

  return res.status(200).json({
    success: true,
    data: {
      token: JWT_TOKEN,
      user: finalUser,
    },
    error: null,
  });
});

export default authRouter;
