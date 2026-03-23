import z from "zod";

export const PresentationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  createdAt: z.string().datetime(),
  startedAt: z.string().datetime().nullable(),
  endedAt: z.string().datetime().nullable(),
});

export const CreatePresentationSchema = z.object({
  userId: z.string(),
  title: z.string(),
});

export type PresentationType = z.infer<typeof PresentationSchema>;
