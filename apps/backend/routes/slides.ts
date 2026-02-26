import { Router } from "express";
import { createMcqSlides, getMcqSlidesById } from "../queries/mcq_slides";

const slideRouter = Router();

slideRouter.post("/slide", async (req, res) => {
  const body = req.body;
  const { question, options, correct_answers, allow_multiple } = body;

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

slideRouter.get("/slide/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await getMcqSlidesById(id);
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

export default slideRouter;
