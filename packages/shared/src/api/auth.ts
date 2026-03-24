import z from "zod";
import { LoginUserSchema, UserSchema } from "../user";
import { ErrorCodes } from "../types";

const UserApiSuccessSchema = z.object({
  success: z.literal(true),
  data: LoginUserSchema,
  error: z.null(),
});

const errorValues = Object.values(ErrorCodes) as [
  (typeof ErrorCodes)[keyof typeof ErrorCodes],
  ...(typeof ErrorCodes)[keyof typeof ErrorCodes][],
];

const UserApiErrorSchema = z.object({
  success: z.literal(false),
  data: z.null(),
  error: z.enum(errorValues),
});

export const UserApiResponseSchema = z.discriminatedUnion("success", [
  UserApiSuccessSchema,
  UserApiErrorSchema,
]);

const LoginUserApiSuccessSchema = z.object({
  success: z.literal(true),
  data: z.object({
    token: z.string(),
    user: LoginUserSchema,
  }),
  error: z.null(),
});

export const LoginUserApiResponseSchema = z.discriminatedUnion("success", [
  LoginUserApiSuccessSchema,
  UserApiErrorSchema,
]);

export const MeApiSuccessSchema = z.object({
  success: z.literal(true),
  data: LoginUserSchema,
  error: z.null(),
});

export const MeApiSchema = z.discriminatedUnion("success", [
  MeApiSuccessSchema,
  UserApiErrorSchema,
]);
