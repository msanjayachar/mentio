import z from "zod";

export const SignupUser = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export const LoginUser = z.object({
  email: z.email(),
  password: z.string(),
});
