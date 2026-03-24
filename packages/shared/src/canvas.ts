import z from "zod";

// Base Canvas Slide Schema
// API Schema. Single CanvasSlide
export const CanvasSlidesSchema = z.object({
  id: z.string(),
  type: z.literal("canvas_slide"),
  canvasObject: z.object({
    objects: z.array(z.unknown()).optional(),
    version: z.string().optional(),
    background: z.string().optional(),
  }),
  presentationId: z.string(),
  createdAt: z.string().datetime(),
});

// API Schema. Array of CanvasSlide
export const CanvasesSlidesSchema = z.array(CanvasSlidesSchema);

/////////////////////////

// Create. Canvas Slide Schema
export const CreateCanvasSlideSchema = z.object({
  presentationId: z.string(),
  canvasObject: z.object({
    objects: z.array(z.unknown()).optional(),
    version: z.string().optional(),
    background: z.string().optional(),
  }),
});

// Update. Canvas Slide Schema
export const UpdateCanvasSlideSchema = z.object({
  canvasObject: z.object({
    objects: z.array(z.unknown()).optional(),
    version: z.string().optional(),
    background: z.string().optional(),
  }),
});

/////////////////////////

/////////////////////////

// DBQuery Single Canvas Slide
export const DBQueryCanvasSchema = z.object({
  id: z.string(),
  canvas_object: z.object({
    objects: z.array(z.unknown()).optional(),
    version: z.string().optional(),
    background: z.string().optional(),
  }),
  presentation_id: z.string(),
  created_at: z.date(),
});

// DBQuery Array of Canvas Slide
export const DBQueryCanvasesSchema = z.array(DBQueryCanvasSchema);

/////////////////////////

// Types
export type CanvasSlide = z.infer<typeof CanvasSlidesSchema>;
