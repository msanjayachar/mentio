import { Router } from "express";
import { createUser, getUser } from "../queries/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRouter = Router();
const saltRounds = 10;
const secret = process.env.SECRET;

authRouter.post("/signup", async (req, res) => {
  console.log("hello from signup");

  const body = req.body;
  const { email, name, password, role } = body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  let user;
  try {
    user = await createUser(email, name, hashedPassword, role);
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: {},
      error: "UNABLE_TO_CREATE_USER",
    });
  }

  return res.status(200).json({
    success: true,
    data: {},
    error: null,
  });
});

authRouter.post("/login", async (req, res) => {
  console.log("hello from login");

  const body = req.body;
  const { email, password } = body;

  let user;
  try {
    user = await getUser(email);
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: {},
      error: "USER_NOT_FOUND",
    });
  }

  if (!secret) throw new Error("SECRET key is missing");

  const match = await bcrypt.compare(password, user.password);

  const JWT_TOKEN = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    secret,
  );

  const finalUser = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  if (match) {
    return res.status(200).json({
      success: true,
      data: {
        token: JWT_TOKEN,
        user: finalUser,
      },
      error: null,
    });
  } else {
    return res.status(400).json({
      success: false,
      data: {},
      error: "USER_NOT_FOUND",
    });
  }
});

export default authRouter;
