import z from "zod";

export const SignupSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
