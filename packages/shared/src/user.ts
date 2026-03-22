import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  createdAt: z.string().datetime(),
});

export const DBQueryUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string().datetime(),
  created_at: z.string().datetime(),
});
