import z from "zod";

const OptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean(),
});

export const McqQuestionSchema = z.object({
  id: z.string(),
  type: z.literal("multiple_choice"),
  question: z.string().default(""),
  options: z.array(OptionSchema).default([]),
  correctAnswers: z.array(OptionSchema).default([]),
  allowMultiple: z.boolean().default(false),
  presentationId: z.string(),
  createdAt: z.string().datetime(),
});

export type McqQuestion = z.infer<typeof McqQuestionSchema>;
export type McqOption = z.infer<typeof OptionSchema>;

export const CreateMcqQuestionSchema = McqQuestionSchema.omit({
  id: true,
  createdAt: true,
});

export const UpdateMcqQuestionSchema = z
  .object({
    question: z.string().optional(),
    options: z.array(OptionSchema).optional(),
    correctAnswers: z.array(OptionSchema).min(1).optional(),
    allowMultiple: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be provided.",
  });
