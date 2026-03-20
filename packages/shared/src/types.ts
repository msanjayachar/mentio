import { CanvasSlide, McqQuestion } from "./mcq";

export type SlidesState = {
  mcqSlides: McqQuestion[];
  canvasSlides: CanvasSlide[];
};

export type SlidesStateTest = (McqQuestion | CanvasSlide)[];
