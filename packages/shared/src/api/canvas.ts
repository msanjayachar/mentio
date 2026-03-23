import z from "zod";
import { ErrorCodes } from "../types";
import { CanvasSlideResponseSchema } from "../canvas";

const CanvasApiSuccessSchema = z.object({
  success: z.literal(true),
  data: CanvasSlideResponseSchema,
  error: z.null(),
});

const errorValues = Object.values(ErrorCodes) as [
  (typeof ErrorCodes)[keyof typeof ErrorCodes],
  ...(typeof ErrorCodes)[keyof typeof ErrorCodes][],
];

const CanvasApiErrorSchema = z.object({
  success: z.literal(false),
  data: z.null(),
  error: z.enum(errorValues),
});

export const CanvasApiResponseSchema = z.discriminatedUnion("success", [
  CanvasApiSuccessSchema,
  CanvasApiErrorSchema,
]);
