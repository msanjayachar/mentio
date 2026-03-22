import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  createdAt: z.string().datetime(),
});

export const LoginUserSchema = z.object({
  userId: z.string(),
  name: z.string(),
  email: z.email(),
});

export const DBQueryUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string(),
  created_at: z.date(),
});
