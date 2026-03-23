import z from "zod";
import { ErrorCodes } from "../types";
import { PresentationSchema } from "../presentation";

const PresentationApiSuccessSchema = z.object({
  success: z.literal(true),
  data: PresentationSchema,
  error: z.null(),
});

const errorValues = Object.values(ErrorCodes) as [
  (typeof ErrorCodes)[keyof typeof ErrorCodes],
  ...(typeof ErrorCodes)[keyof typeof ErrorCodes][],
];

const PresentationApiErrorSchema = z.object({
  success: z.literal(false),
  data: z.null(),
  error: z.enum(errorValues),
});

export const PresentationApiResponseSchema = z.discriminatedUnion("success", [
  PresentationApiSuccessSchema,
  PresentationApiErrorSchema,
]);
