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

export const McqQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  correctAnswers: z.array(z.string()),
  allowMultiple: z.boolean(),
});

export type SignupUser = z.infer<typeof SignupSchema>;
export type LoginUser = z.infer<typeof LoginSchema>;
export type McqQuestion = z.infer<typeof McqQuestionSchema>;
