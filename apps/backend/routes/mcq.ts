import { Router } from "express";
import {
  createMcqSlides,
  deleteSlides,
  deleteSlidesById,
  getMcqSlideById,
  getMcqSlides,
  updateMcqSlides,
} from "../queries/mcq_slides";
import { Request, Response } from "express";
import {
  CreateMcqQuestionSchema,
  DBQueryMcqQuestionSchema,
  DBQueryMcqQuestionsSchema,
  McqQuestionSchema,
  UpdateMcqQuestionSchema,
} from "@shared/mcq";
import { ZodError } from "zod";
import { ErrorCodes } from "@shared/types";

const mcqSlidesRouter = Router();

mcqSlidesRouter.post("/", async (req, res) => {
  const body = req.body;
  const { userId } = req.user;
  const { question, options, allowMultiple, presentationId } = body;

  let finalSlide;
  try {
    const parsed = CreateMcqQuestionSchema.parse({
      question,
      options,
      allowMultiple,
      presentationId,
    });

    const result = await createMcqSlides(
      userId,
      parsed.question,
      parsed.options,
      parsed.allowMultiple,
      parsed.presentationId,
    );

    const slide = DBQueryMcqQuestionSchema.parse(result);

    finalSlide = {
      id: slide.id,
      type: "multiple_choice",
      question: slide.question,
      options: slide.options,
      allowMultiple: slide.allow_multiple,
      presentationId: slide.presentation_id,
      createdAt: slide.created_at,
    };
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

    return res.status(500).json({
      success: false,
      data: null,
      error: ErrorCodes.INTERNAL_SERVER_ERROR,
    });
  }

  return res.status(200).json({
    success: true,
    data: finalSlide,
    error: null,
  });
});

mcqSlidesRouter.get("/", async (req: Request, res: Response) => {
  const { userId } = req.user;

  let slidesWithType;
  try {
    const result = await getMcqSlides(userId);
    const slides = DBQueryMcqQuestionsSchema.parse(result);

    slidesWithType = slides.map((slide) => ({
      id: slide.id,
      type: "multiple_choice",
      question: slide.question,
      options: slide.options,
      allowMultiple: slide.allow_multiple,
      presentationId: slide.presentation_id,
      createdAt: slide.created_at,
    }));
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_REQUEST,
      });
    }

    console.error("Get MCQ Slides failed", {
      userId,
      error,
    });

    return res.status(500).json({
      success: false,
      data: null,
      error: ErrorCodes.INTERNAL_SERVER_ERROR,
    });
  }

  return res.status(200).json({
    success: true,
    data: slidesWithType,
    error: null,
  });
});

mcqSlidesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  let finalSlide;
  try {
    const result = await getMcqSlideById(id, userId);

    const slide = DBQueryMcqQuestionSchema.parse(result);

    finalSlide = {
      id: slide.id,
      type: "multiple_choice",
      question: slide.question,
      options: slide.options,
      allowMultiple: slide.allow_multiple,
      presentationId: slide.presentation_id,
      createdAt: slide.created_at,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_REQUEST,
      });
    }

    console.error("Get MCQ by id failed", {
      id,
      error,
    });

    return res.status(500).json({
      success: false,
      data: null,
      error: ErrorCodes.INTERNAL_SERVER_ERROR,
    });
  }

  return res.status(200).json({
    success: true,
    data: finalSlide,
    error: null,
  });
});

mcqSlidesRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const body = req.body;
  const { question, options, allowMultiple } = body;

  let slide;
  try {
    const parsed = UpdateMcqQuestionSchema.parse({
      question,
      options,
      allowMultiple,
    });

    const result = await updateMcqSlides(
      id,
      userId,
      parsed.question,
      parsed.options,
      parsed.allowMultiple,
    );

    slide = DBQueryMcqQuestionSchema.parse(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_REQUEST,
      });
    }

    console.error("Update MCQ failed", {
      id,
      error,
    });

    return res.status(500).json({
      success: false,
      data: null,
      error: ErrorCodes.INTERNAL_SERVER_ERROR,
    });
  }

  const finalSlide = {
    id: slide.id,
    type: "multiple_choice",
    question: slide.question,
    options: slide.options,
    allowMultiple: slide.allow_multiple,
    presentationId: slide.presentation_id,
    createdAt: slide.created_at,
  };

  return res.status(200).json({
    success: true,
    data: finalSlide,
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
