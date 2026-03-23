import z from "zod";

export const CanvasSlidesSchema = z.object({
  id: z.string(),
  type: z.literal("canvas_slide"),
  canvasObject: z.any().nullable().optional(),
});

export const CanvasSlideResponseSchema = CanvasSlidesSchema.extend({
  createdAt: z.string().datetime(),
});

export type CanvasSlide = z.infer<typeof CanvasSlideResponseSchema>;
