import z from "zod";
import { McqQuestionSchema } from "../mcq";
import { ErrorCodes } from "../types";

const McqApiSuccessSchema = z.object({
  success: z.literal(true),
  data: McqQuestionSchema,
  error: z.null(),
});

const errorValues = Object.values(ErrorCodes) as [
  (typeof ErrorCodes)[keyof typeof ErrorCodes],
  ...(typeof ErrorCodes)[keyof typeof ErrorCodes][],
];

const McqApiErrorSchema = z.object({
  success: z.literal(false),
  data: z.null(),
  error: z.enum(errorValues),
});

export const McqApiResponseSchema = z.discriminatedUnion("success", [
  McqApiSuccessSchema,
  McqApiErrorSchema,
]);
