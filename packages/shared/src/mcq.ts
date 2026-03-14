import z from "zod";

const OptionSchema = z.object({
  id: z.string(),
  option: z.string(),
  correctAnswer: z.boolean(),
});

export const McqQuestionSchema = z.object({
  id: z.string(),
  type: z.literal("multiple_choice"),
  question: z.string().default(""),
  options: z.array(OptionSchema).default([]),
  correctAnswers: z.array(z.string()).default([]),
  allowMultiple: z.boolean().default(false),
});

export type McqQuestion = z.infer<typeof McqQuestionSchema>;
export type McqOption = z.infer<typeof OptionSchema>;
