import z from "zod";
import { UserSchema } from "../user";

export const UserApiSuccessSchema = z.object({
  success: z.literal(true),
  data: UserSchema,
  error: z.null(),
});

export const UserApiErrorSchema = z.object({
  success: z.literal(false),
  data: z.null(),
  error: z.string(),
});

export const UserApiResponseSchema = z.union([
  UserApiSuccessSchema,
  UserApiErrorSchema,
]);
