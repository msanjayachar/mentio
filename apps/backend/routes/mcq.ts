import { Router } from "express";
import {
  createMcqSlides,
  getMcqSlides,
  getMcqSlidesById,
} from "../queries/mcq_slides";

const mcqSlidesRouter = Router();

// TODO: Test out. POST and GET
mcqSlidesRouter.post("/slides", async (req, res) => {
  const body = req.body;
  const { question, user_id, options, correct_answers, allow_multiple } = body;

  try {
    await createMcqSlides(question, options, correct_answers, allow_multiple);
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_CREATE_SLIDE",
    });
  }

  return res.status(200).json({
    success: true,
    data: {},
    error: null,
  });
});

mcqSlidesRouter.get("/slides", async (req, res) => {
  const body = req.body;
  const { userId } = body;

  let slides;
  try {
    slides = await getMcqSlides(userId);
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
      slides,
    },
    error: null,
  });
});

mcqSlidesRouter.get("/slides/:id", async (req, res) => {
  const { id } = req.params;

  let slide;
  try {
    slide = await getMcqSlidesById(id);
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
      slide,
    },
    error: null,
  });
});

mcqSlidesRouter.patch("/slides/:id", async (req, res) => {});

mcqSlidesRouter.delete("/slides", async (req, res) => {});

mcqSlidesRouter.delete("/slides/:id", async (req, res) => {});

export default mcqSlidesRouter;
