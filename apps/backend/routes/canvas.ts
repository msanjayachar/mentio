import { Router } from "express";
import { createCanvasSlides, getCanvasSlides } from "../queries/canvas_slides";

const canvasSlidesRouter = Router();

canvasSlidesRouter.post("/", async (req, res) => {
  const { userId } = req.user;
  const body = req.body;
  const { object } = body;

  let canvas;
  try {
    canvas = await createCanvasSlides(userId, object);
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_CREATE_SLIDE",
    });
  }

  return res.status(200).json({
    success: true,
    data: {
      slide: canvas,
    },
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

  return res.status(200).json({
    success: true,
    data: {
      slides: canvasSlides,
    },
    error: null,
  });
});

export default canvasSlidesRouter;
