import jwt from "jsonwebtoken";
import "dotenv/config";

export const middleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  const secret = process.env.SECRET;

  if (!authHeader) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "unauthorized",
    });
  }

  if (!secret) {
    throw new Error("SECRET key is missing.");
  }

  const parts = authHeader.split(" ");

  if (parts[0] !== "Bearer") {
    return res.status(400).json({
      success: false,
      data: null,
      error: "unauthorized",
    });
  }

  const token = parts[1];

  try {
    const payload = jwt.verify(token, secret) as {
      userId: string;
      role: "mentor" | "mentee";
    };

    req.user = { userId: payload.userId, role: payload.role };

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "unauthorized",
    });
  }
};
