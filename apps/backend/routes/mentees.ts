import { Router } from "express";
import { createMentee } from "../queries/mentees";
import { ZodError } from "zod";
import { ErrorCodes } from "@shared/types";

const menteesRouter = Router();

menteesRouter.post("/", async (req, res) => {
  const body = req.body;
  const { presentationId } = body;

  let mentee;
  try {
    const result = await createMentee(presentationId);

    mentee = {
      id: result.id,
      presentationId: result.presentation_id,
      createdAt: result.created_at,
    };
  } catch (error) {
    console.error("Create Mentee failed", {
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
    data: mentee,
    error: null,
  });
});

export default menteesRouter;
