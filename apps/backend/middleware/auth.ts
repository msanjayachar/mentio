import jwt from "jsonwebtoken";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

interface AuthPayload {
  userId: string;
  role: string;
}

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const secret = process.env.SECRET;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      data: null,
      error: "UNAUTHORIZED",
    });
  }

  if (!secret) {
    throw new Error("SECRET key is missing.");
  }

  const parts = authHeader.split(" ");

  if (parts[0] !== "Bearer") {
    return res.status(401).json({
      success: false,
      data: null,
      error: "UNAUTHORIZED",
    });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      throw new Error("Invalid token payload");
    }

    const payload = decoded as AuthPayload;

    req.user = { userId: payload.userId, role: payload.role };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: null,
      error: "UNAUTHORIZED",
    });
  }
};
