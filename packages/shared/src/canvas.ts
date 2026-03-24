import z from "zod";

// Base Canvas Slide Schema
// API Schema. Single CanvasSlide
export const CanvasSlidesSchema = z.object({
  id: z.string(),
  type: z.literal("canvas_slide"),
  // Q: Shouldn't this be an object
  canvasObject: z.any().nullable().optional(),
  presentationId: z.string(),
  createdAt: z.string().datetime(),
});

// API Schema. Array of CanvasSlide
export const CanvasesSlidesSchema = z.array(CanvasSlidesSchema);

/////////////////////////

// Create. Canvas Slide Schema
export const CreateCanvasSlideSchema = z.object({
  presentationId: z.string(),
  canvasObject: z.any().nullable().optional(),
});

// Update. Canvas Slide Schema
export const UpdateCanvasSlideSchema = z.object({
  canvasObject: z.any().nullable().optional(),
});

/////////////////////////

/////////////////////////

// DBQuery Single Canvas Slide
export const DBQueryCanvasSchema = z.object({
  id: z.string(),
  canvas_object: z.any().nullable().optional(),
  presentation_id: z.string(),
  created_at: z.date(),
});

// DBQuery Array of Canvas Slide
export const DBQueryCanvasesSchema = z.array(DBQueryCanvasSchema);

/////////////////////////

// Types
export type CanvasSlide = z.infer<typeof CanvasSlidesSchema>;
