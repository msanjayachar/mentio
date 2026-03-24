import { Router } from "express";
import {
  createCanvasSlides,
  getCanvasSlides,
  getCanvasSlide,
  updateCanvasSlides,
} from "../queries/canvas_slides";
import {
  CanvasSlidesSchema,
  CreateCanvasSlideSchema,
  DBQueryCanvasesSchema,
  DBQueryCanvasSchema,
} from "@shared/canvas";
import { ErrorCodes } from "@shared/types";
import { ZodError } from "zod";

const canvasSlidesRouter = Router();

canvasSlidesRouter.post("/", async (req, res) => {
  const { userId } = req.user;
  const body = req.body;
  const { presentationId, object } = body;

  let finalCanvas;
  try {
    const parsed = CreateCanvasSlideSchema.parse({ presentationId, object });

    const dbQueryRes = await createCanvasSlides(
      userId,
      parsed.presentationId,
      parsed.canvasObject,
    );

    const canvas = DBQueryCanvasSchema.parse(dbQueryRes);

    finalCanvas = {
      id: canvas.id,
      type: "canvas_slide",
      canvasObject: canvas.canvas_object,
      presentationId: canvas.presentation_id,
      createdAt: canvas.created_at,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_REQUEST,
      });
    }
    console.error("Create Canvas Slide failed", {
      userId,
      presentationId,
      error,
    });

    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_CREATE_SLIDE",
    });
  }

  return res.status(200).json({
    success: true,
    data: finalCanvas,
    error: null,
  });
});

canvasSlidesRouter.get("/", async (req, res) => {
  const { userId } = req.user;

  let canvasSlides;
  try {
    const dbQueryRes = await getCanvasSlides(userId);

    canvasSlides = DBQueryCanvasesSchema.parse(dbQueryRes);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_REQUEST,
      });
    }
    console.error("Get Canvas Slide failed", {
      userId,
      error,
    });

    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_FETCH_SLIDES",
    });
  }

  const finalCanvasSlides = canvasSlides.map((canvasSlide) => {
    return {
      id: canvasSlide.id,
      type: "canvas_slide",
      canvasObject: canvasSlide.canvas_object,
      presentationId: canvasSlide.presentation_id,
      createdAt: canvasSlide.created_at,
    };
  });

  return res.status(200).json({
    success: true,
    data: finalCanvasSlides,
    error: null,
  });
});

canvasSlidesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  let canvasSlide;
  try {
    const dbQueryRes = await getCanvasSlide(id, userId);

    canvasSlide = DBQueryCanvasSchema.parse(dbQueryRes);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_REQUEST,
      });
    }

    return res.status(500).json({
      success: false,
      data: null,
      error: ErrorCodes.INTERNAL_SERVER_ERROR,
    });
  }

  const finalCanvas = {
    id: canvasSlide.id,
    type: "canvas_slide",
    canvasObject: canvasSlide.canvas_object,
    createdAt: canvasSlide.created_at,
  };

  return res.status(200).json({
    success: true,
    data: {
      slide: finalCanvas,
    },
    error: null,
  });
});

canvasSlidesRouter.patch("/:presentationId", async (req, res) => {
  const { presentationId } = req.params;
  const { userId } = req.user;
  const body = req.body;
  const { canvasObject } = body;

  let canvasSlide;
  try {
    const parsed = CanvasSlidesSchema.parse({
      presentationId,
      canvasObject,
    });

    const dbQueryRes = await updateCanvasSlides(
      parsed.id,
      userId,
      parsed.canvasObject,
    );

    canvasSlide = DBQueryCanvasSchema.parse(dbQueryRes);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_REQUEST,
      });
    }
    console.error("Update Canvas Slide failed", {
      userId,
      error,
    });

    return res.status(500).json({
      success: false,
      data: null,
      error: ErrorCodes.INTERNAL_SERVER_ERROR,
    });
  }

  const finalCanvas = {
    id: canvasSlide.id,
    type: "canvas_slide",
    canvasObject: canvasSlide.canvas_object,
    createdAt: canvasSlide.created_at,
  };

  return res.status(200).json({
    success: true,
    data: finalCanvas,
    error: null,
  });
});

export default canvasSlidesRouter;
