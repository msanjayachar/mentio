import { Router } from "express";
import {
  createPresentation,
  getPresentationById,
  getPresentations,
  startPresentation,
  updatePresentationTitle,
} from "../queries/presentations";
import { CreatePresentationSchema } from "@shared/presentation";
import { ErrorCodes } from "@shared/types";
import { ZodError } from "zod";

const presentationsRouter = Router();

presentationsRouter.post("/", async (req, res) => {
  const body = req.body;
  const { userId } = req.user;
  const { title } = body;

  let result;
  try {
    const parsed = CreatePresentationSchema.parse({ userId, title });

    result = await createPresentation(parsed.userId, parsed.title);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        data: null,
        error: ErrorCodes.INVALID_REQUEST,
      });
    }

    console.error("Create Presentation failed", {
      userId,
      title,
      error,
    });

    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_CREATE_PRESENTATION",
    });
  }

  const presentation = {
    id: result.id,
    userId: result.id,
    title: result.title,
    description: result.description,
    createdAt: result.created_at,
    startedAt: result.started_at,
    endedAt: result.ended_at,
  };

  return res.status(200).json({
    success: true,
    data: presentation,
    error: null,
  });
});

presentationsRouter.get("/", async (req, res) => {
  const body = req.body;
  const { userId } = req.user;

  let result;
  try {
    result = await getPresentations(userId);
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_GET_PRESENTATION",
    });
  }

  const presentations = result.map((presentation) => ({
    id: presentation.id,
    userId: presentation.user_id,
    title: presentation.title,
    description: presentation.description,
    createdAt: presentation.created_at,
    startedAt: presentation.started_at,
    endedAt: presentation.ended_at,
  }));

  return res.status(200).json({
    success: true,
    data: presentations,
    error: null,
  });
});

presentationsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  let result;
  try {
    result = await getPresentationById(id, userId);
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_CREATE_PRESENTATION",
    });
  }

  const presentation = {
    id: result.id,
    userId: result.id,
    title: result.title,
    description: result.description,
    createdAt: result.created_at,
    startedAt: result.started_at,
    endedAt: result.ended_at,
  };

  return res.status(200).json({
    success: true,
    data: presentation,
    error: null,
  });
});

presentationsRouter.patch("/start/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const body = req.body;
  const { title } = body;

  let result;
  try {
    result = await startPresentation(id, title, userId);
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_START_PRESENTATION",
    });
  }

  const presentation = {
    id: result.id,
    userId: result.user_id,
    title: result.title,
    createdAt: result.created_at,
    startedAt: result.started_at,
    endedAt: result.ended_at,
  };

  return res.status(200).json({
    success: true,
    data: presentation,
    error: null,
  });
});

presentationsRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const body = req.body;
  const { title } = body;

  let result;
  try {
    result = await updatePresentationTitle(id, title, userId);
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      error: "FAILED_TO_UPDATE_TITLE",
    });
  }

  const presentation = {
    id: result.id,
    userId: result.user_id,
    title: result.title,
    createdAt: result.created_at,
    startedAt: result.started_at,
    endedAt: result.ended_at,
  };

  return res.status(200).json({
    success: true,
    data: presentation,
    error: null,
  });
});

export default presentationsRouter;
