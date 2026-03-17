import { Router } from "express";
import {
  createMcqSlides,
  deleteSlides,
  deleteSlidesById,
  getMcqSlides,
  getMcqSlidesById,
  updateMcqSlides,
} from "../queries/mcq_slides";
import { Request, Response } from "express";
import { McqQuestionSchema } from "@shared/mcq";

const mcqSlidesRouter = Router();

mcqSlidesRouter.post("/", async (req, res) => {
  const body = req.body;
  const { userId } = req.user;
  const { id, type, question, options, correctAnswers, allowMultiple } = body;

  let slide;
  let parsed;

  try {
    parsed = McqQuestionSchema.parse({
      id,
      type,
      question,
      options,
      correctAnswers,
      allowMultiple,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "INVALID_REQUEST",
    });
  }

  try {
    slide = await createMcqSlides(
      userId,
      parsed.question,
      parsed.options,
      parsed.correctAnswers,
      parsed.allowMultiple,
    );
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_CREATE_SLIDE",
    });
  }

  const finalSlide = {
    id: slide.id,
    type: "multiple_choice",
    question: slide.question,
    options: slide.options,
    correrctAnswers: slide.correct_answers,
    allowMultiple: slide.allow_multiple,
  };

  return res.status(200).json({
    success: true,
    data: {
      slide: finalSlide,
    },
    error: null,
  });
});

mcqSlidesRouter.get("/", async (req: Request, res: Response) => {
  const { userId } = req.user;

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

  const slidesWithType = slides.map((slide) => ({
    ...slide,
    type: "multiple_choice",
  }));

  return res.status(200).json({
    success: true,
    data: {
      slides: slidesWithType,
    },
    error: null,
  });
});

mcqSlidesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  let slide;
  try {
    slide = await getMcqSlidesById(id);
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_GET_SLIDE",
    });
  }

  return res.status(200).json({
    success: true,
    data: slide,
    error: null,
  });
});

mcqSlidesRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const body = req.body;
  const { question, options, correctAnswers, allowMultiple } = body;

  let parsed;
  try {
    parsed = McqQuestionSchema.parse({
      question,
      options,
      correctAnswers,
      allowMultiple,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "INVALID_REQUEST",
    });
  }

  let result;
  try {
    result = await updateMcqSlides(
      id,
      userId,
      parsed.question,
      parsed.options,
      parsed.correctAnswers,
      parsed.allowMultiple,
    );
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_UPDATE_SLIDE",
    });
  }

  return res.status(200).json({
    success: true,
    data: result,
    error: null,
  });
});

mcqSlidesRouter.delete("/", async (req, res) => {
  const { userId } = req.user;

  let result: number | undefined;
  try {
    result = await deleteSlides(userId);
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      error: "UNABLE_TO_DELETE",
    });
  }

  if (result > 0) {
    return res.status(200).json({
      success: true,
      data: {
        message: "Slides deleted successfully",
        slidesCount: result,
      },
      error: null,
    });
  } else {
    return res.status(200).json({
      success: true,
      data: {
        message: "No Slides to delete",
      },
      error: null,
    });
  }
});

mcqSlidesRouter.delete("/:id", async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  let result: number | undefined;

  try {
    result = await deleteSlidesById(id, userId);
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: null,
      error: "UNABLE_TO_DELETE",
    });
  }

  if (result > 0) {
    return res.status(200).json({
      success: true,
      data: {
        message: "Slide deleted successfully",
      },
      error: null,
    });
  } else {
    return res.status(200).json({
      success: true,
      data: {
        message: "No Slide to delete",
      },
      error: null,
    });
  }
});

export default mcqSlidesRouter;
