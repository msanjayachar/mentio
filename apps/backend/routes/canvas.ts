import { Router } from "express";
import { createCanvasSlides } from "../queries/canvas_slides";

const canvasSlidesRouter = Router();

canvasSlidesRouter.post("/", async (req, res) => {
  const { userId } = req.user;
  const body = req.body;
  const { object } = body;

  console.log("*************************");
  console.log("userId: ", userId);
  console.log("*************************");

  let canvas;
  try {
    canvas = await createCanvasSlides(userId, object);
  } catch (error) {
    console.log("*************************");
    console.log("error: ", error);
    console.log("*************************");

    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_CREATE_SLIDE",
    });
  }

  return res.status(200).json({
    success: true,
    data: canvas,
    error: null,
  });
});

export default canvasSlidesRouter;
