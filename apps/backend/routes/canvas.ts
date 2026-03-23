import { Router } from "express";
import {
  createCanvasSlides,
  getCanvasSlides,
  getCanvasSlide,
  updateCanvasSlides,
} from "../queries/canvas_slides";
import { CanvasSlidesSchema } from "@shared/canvas";
import { ErrorCodes } from "@shared/types";
import { ZodError } from "zod";

const canvasSlidesRouter = Router();

canvasSlidesRouter.post("/", async (req, res) => {
  const { userId } = req.user;
  const body = req.body;
  const { presentationId, object } = body;

  let canvas;
  try {
    canvas = await createCanvasSlides(userId, presentationId, object);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_REQUEST,
      });
    }
    console.error("Create MCQ failed", {
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

  const finalCanvas = {
    id: canvas.id,
    type: "canvas_slide",
    canvasObject: canvas.canvas_object,
    createdAt: canvas.created_at,
  };

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
    canvasSlides = await getCanvasSlides(userId);
  } catch (error) {
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
      createdAt: canvasSlide.created_at,
    };
  });

  return res.status(200).json({
    success: true,
    data: {
      slides: finalCanvasSlides,
    },
    error: null,
  });
});

canvasSlidesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  let canvasSlide;
  try {
    canvasSlide = await getCanvasSlide(id, userId);
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_FETCH_SLIDES",
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

canvasSlidesRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const body = req.body;
  const { canvasObject } = body;

  const type = "canvas_slide";

  let parsed;
  try {
    parsed = CanvasSlidesSchema.parse({
      id,
      type,
      canvasObject,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "INVALID_REQUEST",
    });
  }

  let canvasSlide;
  try {
    canvasSlide = await updateCanvasSlides(id, userId, canvasObject);
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_UPDATE_SLIDE",
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
