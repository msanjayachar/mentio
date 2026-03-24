import { createUser, getUser, getUserByUserId } from "../queries/user";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { middleware } from "../middleware/auth";
import { Request, Response } from "express";
import { SignupSchema, LoginSchema } from "@shared/auth";
import { DBQueryUserSchema } from "@shared/user";
import { ZodError } from "zod";
import "dotenv/config";
import { ErrorCodes } from "@shared/types";

const authRouter = Router();
const saltRounds = 10;
const secret = process.env.SECRET;

if (!secret) throw new Error("SECRET key is missing");

authRouter.get("/me", middleware, async (req: Request, res: Response) => {
  const { userId } = req.user;

  let finalUser;
  try {
    const user = await getUserByUserId(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        data: null,
        error: "UNAUTHORIZED",
      });
    }
    const PartialUser = DBQueryUserSchema.omit({
      password: true,
    });
    const parsedUser = PartialUser.parse(user);

    finalUser = {
      userId: parsedUser.id,
      name: parsedUser.name,
      email: parsedUser.email,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_REQUEST,
      });
    }

    console.error("/me failed", {
      userId,
      error,
    });

    return res.status(500).json({
      success: false,
      data: null,
      error: "INTERNAL_ERROR",
    });
  }

  return res.status(200).json({
    success: true,
    data: finalUser,
    error: null,
  });
});

authRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const { name, email, password } = body;

  let finalUser;
  try {
    const parsed = SignupSchema.parse({ name, email, password });

    const exists = await getUser(email);

    if (exists) {
      return res.status(400).json({
        success: false,
        data: null,
        error: ErrorCodes.EMAIL_ALREADY_EXISTS,
      });
    }

    const hashedPassword = await bcrypt.hash(parsed.password, saltRounds);
    const user = await createUser(parsed.name, parsed.email, hashedPassword);

    const PartialUser = DBQueryUserSchema.omit({
      password: true,
    });
    const parsedQueryResponse = PartialUser.parse(user);

    finalUser = {
      userId: parsedQueryResponse.id,
      name: parsedQueryResponse.name,
      email: parsedQueryResponse.email,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_REQUEST,
      });
    }

    console.error("Signup failed", {
      name,
      email,
      error,
    });

    return res.status(500).json({
      success: false,
      data: null,
      error: ErrorCodes.UNABLE_TO_CREATE_USER,
    });
  }

  return res.status(200).json({
    success: true,
    data: finalUser,
    error: null,
  });
});

authRouter.post("/login", async (req, res) => {
  const body = req.body;
  const { email, password } = body;

  let JWT_TOKEN;
  let finalUser;
  try {
    const parsed = LoginSchema.parse({ email, password });
    const user = await getUser(parsed.email);

    if (!user) {
      return res.status(401).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_CREDENTIALS,
      });
    }
    const PartialUser = DBQueryUserSchema.omit({
      password: true,
    });

    const parsedUser = DBQueryUserSchema.parse(user);

    const match = await bcrypt.compare(password, parsedUser.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_CREDENTIALS,
      });
    }

    JWT_TOKEN = jwt.sign(
      {
        userId: parsedUser.id,
      },
      secret,
      { expiresIn: 60 * 60 },
    );

    finalUser = {
      userId: parsedUser.id,
      name: parsedUser.name,
      email: parsedUser.email,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_REQUEST,
      });
    }

    console.error("Login failed", {
      name,
      email,
      error,
    });

    return res.status(500).json({
      success: false,
      data: null,
      error: ErrorCodes.INTERNAL_SERVER_ERROR,
    });
  }

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
