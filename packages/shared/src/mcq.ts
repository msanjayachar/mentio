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
  correctAnswers: z.array(OptionSchema).default([]),
  allowMultiple: z.boolean().default(false),
});

export const CanvasSlidesSchema = z.object({
  id: z.string(),
  type: z.literal("canvas_slide"),
  // object: z.object(),
  canvasObject: z.any().nullable().optional(),
});

export const McqQuestionResponseSchema = McqQuestionSchema.extend({
  createdAt: z.string().datetime(),
});

export const CanvasSlideResponseSchema = CanvasSlidesSchema.extend({
  createdAt: z.string().datetime(),
});

export type McqQuestion = z.infer<typeof McqQuestionResponseSchema>;
export type McqOption = z.infer<typeof OptionSchema>;
export type CanvasSlide = z.infer<typeof CanvasSlideResponseSchema>;
export type SlideState =
  | z.infer<typeof McqQuestionSchema>
  | z.infer<typeof CanvasSlidesSchema>;

export const McqQuestionUpdateSchema = z.object({
  question: z.string().default("").optional(),
  options: z.array(OptionSchema).default([]).optional(),
  correctAnswers: z.array(OptionSchema).default([]).optional(),
  allowMultiple: z.boolean().default(false).optional(),
});
