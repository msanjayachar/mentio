import z from "zod";

// Base McqQuestion Slide Schema
// API Schema. Single McqQuestion
const OptionSchema = z.object({
  id: z.string(),
  text: z.string(),
  isCorrect: z.boolean(),
});

export const McqQuestionSchema = z.object({
  id: z.string(),
  type: z.literal("multiple_choice"),
  question: z.string().default(""),
  // FIX: Because both of these look the same. We don't have to have the second ONE at all.
  options: z.array(OptionSchema).default([]),
  allowMultiple: z.boolean().default(false),
  presentationId: z.string(),
  createdAt: z.string().datetime(),
});

/////////////////////////

// API Schema. Array of McqQuestion
export const McqQuestionsPublicSchema = z.array(McqQuestionSchema);

/////////////////////////

// Create McqQuestion Schema
export const CreateMcqQuestionSchema = McqQuestionSchema.omit({
  id: true,
  type: true,
  createdAt: true,
}).extend({
  presentationId: z.string(),
});

export type CreateMcqQuestion = z.infer<typeof CreateMcqQuestionSchema>;

// Update McqQuestionSchema
export const UpdateMcqQuestionSchema = z
  .object({
    question: z.string().optional(),
    options: z.array(OptionSchema).optional(),
    allowMultiple: z.boolean().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be provided.",
  });

/////////////////////////

// DBQuery McqQuestion Schema
export const DBQueryMcqQuestionSchema = z.object({
  id: z.string(),
  question: z.string().default(""),
  options: z.array(OptionSchema).default([]),
  allow_multiple: z.boolean().default(false),
  presentation_id: z.string(),
  created_at: z.date(),
});

// DBQuery Array of McqQuestion Schema
export const DBQueryMcqQuestionsSchema = z.array(DBQueryMcqQuestionSchema);

/////////////////////////

// Types
export type McqQuestion = z.infer<typeof McqQuestionSchema>;
export type McqOption = z.infer<typeof OptionSchema>;
