import z from "zod";
import { McqQuestion, McqQuestionSchema } from "./mcq";
import { CanvasSlide, CanvasSlidesSchema } from "./canvas";
import { LoginSchema, SignupSchema } from "./auth";

export type SignupUser = z.infer<typeof SignupSchema>;
export type LoginUser = z.infer<typeof LoginSchema>;

export type SlideState =
  | z.infer<typeof McqQuestionSchema>
  | z.infer<typeof CanvasSlidesSchema>;

export type SlidesState = (McqQuestion | CanvasSlide)[];

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  INVALID_REQUEST: "Invalid input. Check your data.",
  UNABLE_TO_CREATE_USER: "Something went wrong. Please try again.",
  EMAIL_ALREADY_EXISTS: "This email is already registered",
  INVALID_CREDENTIALS: "Invalid email or password",
  INTERNAL_SERVER_ERROR: "Something went wrong. Please try again later.",
};

export const ErrorCodes = {
  UNABLE_TO_CREATE_USER: "UNABLE_TO_CREATE_USER",
  INVALID_REQUEST: "INVALID_REQUEST",
  EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
} as const;

export type ErrorCode = keyof typeof ErrorCodes;
