"use client";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import type { McqOption, McqQuestion } from "@shared/mcq";
import type { CanvasSlide } from "@shared/canvas";
import { SlidesState } from "@shared/types";
import { FabricJSCanvas } from "@repo/ui/FabricJSCanvas";
import { updateSlide } from "@/lib/utils";
import { useCurrentUser } from "./context/authContext";
import { PresentationApiResponseSchema } from "@shared/api/presentation";
import Visualization from "./visualization/visualization";
import BarChart from "./visualization/bars";

type ResponseType = Record<string, { participantId: string; answer: string }[]>;

const Question = ({
  tool,
  slides,
  setSlides,
  selectedSlide,
  handleQuestionSelect,
  handleEdit,
  visualizationType,
  setVisualizationType,
}: {
  tool: "text" | "image" | "shapes";
  slides: SlidesState;
  setSlides: Dispatch<SetStateAction<SlidesState>>;
  selectedSlide: string;
  handleQuestionSelect: () => void;
  handleEdit: () => void;
  visualizationType: "bar" | "pie" | "split" | "dots";
  setVisualizationType: Dispatch<
    SetStateAction<"bar" | "pie" | "split" | "dots">
  >;
}) => {
  const { token } = useCurrentUser();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  if (!token) return;

  const responses: ResponseType = {
    "a12f9c3e-7b21-4d1a-bc91-9f3e2a7d5c10": [
      { participantId: "Xk92LmQaPzTnF1aBc", answer: "2" },
      { participantId: "Qw8ErTyUiOp123Zx", answer: "3" },
    ],
    "b77de4a1-2c9f-4e8d-91ab-6f3c0d2e4b55": [
      { participantId: "Mn45OpQrStUvWxYz", answer: "4" },
      { participantId: "AaBbCcDdEeFfGgHh", answer: "1" },
      { participantId: "ZzYyXxWwVvUuTtSs", answer: "2" },
    ],
    "c9e44b82-5d31-4f6a-8b3e-2c1d7a9e0f22": [
      { participantId: "PpOoIiUuYyTtRrEe", answer: "3" },
    ],
    "d3a7f1c9-8b22-4c6e-9a11-0d5e2f8b7c33": [
      { participantId: "LkJhGfDsAaQwErTy", answer: "1" },
      { participantId: "UiOpAsDfGhJkLzXc", answer: "4" },
    ],
    "e5b2c8a7-1f90-4d2e-a6c4-3b7d9e1f0a66": [
      { participantId: "VvBbNnMmQqWwEeRr", answer: "2" },
      { participantId: "TtYyUuIiOoPpAaSs", answer: "3" },
      { participantId: "DdFfGgHhJjKkLlZz", answer: "4" },
    ],
  };

  // Getting the slide (mcq or canvas) thats selected right now
  const slide = Array.isArray(slides)
    ? slides?.find((slide) => slide.id === selectedSlide)
    : undefined;

  const colors = [
    "bg-blue-500",
    "bg-rose-400",
    "bg-indigo-300",
    "bg-indigo-900",
    "bg-red-800",
  ];

  const updateCanvasSlide = async (
    canvasSlide: CanvasSlide,
    canvasId: string,
  ) => {
    // const url = `http://localhost:8000/canvas/${canvasSlide.id}`;
    const url = `http://localhost:8000/canvas/${selectedSlide}`;
    const presentation_id = canvasSlide.presentationId;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        canvasObject: canvasSlide.canvasObject,
        id: canvasId,
      }),
    });

    return response;
  };

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!slide) return;
    if (slide.type !== "multiple_choice") return;

    const updatedSlide: McqQuestion = {
      ...slide,
      question: e.target.value,
    };

    timeoutRef.current = setTimeout(() => {
      updateSlide(updatedSlide, token);
    }, 600);

    setSlides((slides) =>
      slides.map((slide) =>
        slide.id === selectedSlide
          ? {
              ...slide,
              question: e.target.value,
            }
          : slide,
      ),
    );
  };

  if (!slide) return null;

  // TODO: Build the dummy data with the slide that we are working with right now

  const dummyData = {
    items: [
      { label: "JavaScript", value: 80, color: colors[0] },

      { label: "Python", value: 70, color: colors[1] },

      { label: "Java", value: 60, color: colors[2] },

      { label: "C++", value: 50, color: colors[3] },

      { label: "Go", value: 40, color: colors[4] },
    ],

    height: 300,
  };

  return (
    <div className="m-8 h-175 w-auto rounded-md border-2 bg-white hover:border-blue-800">
      <span className="flex justify-end pt-4 pr-4">Mentio</span>
      <div className="flex flex-col gap-6 px-4">
        {slide.type === "multiple_choice" && (
          <div className="flex flex-col items-center gap-4 px-8 pt-6">
            <input
              value={slide.question ?? ""}
              className="h-18 w-full rounded-md border-2 px-4 text-2xl hover:border-blue-800 focus:border-transparent focus:outline-2 focus:outline-blue-800"
              onChange={(e) => {
                handleUpdate(e);
              }}
              onFocus={() => {
                handleQuestionSelect();
              }}
              placeholder="Ask your question here..."
            />
            <div
              className={`mx-8 flex ${slide.type === "multiple_choice" ? "h-120" : "h-150"} w-full cursor-pointer items-end justify-between gap-x-2 rounded-md border-2 px-12 pb-8 hover:border-blue-800`}
              onClick={() => handleEdit()}
            >
              {/* TODO: Add visualization graph here. */}
              <Visualization
                items={dummyData.items}
                height={dummyData.height}
                size={dummyData.height}
                visualizationType={visualizationType}
              />

              {/* <> */}
              {/*   {slide && */}
              {/*     slide.options.map((opt: McqOption, idx: number) => ( */}
              {/*       <div */}
              {/*         key={opt.id} */}
              {/*         className="flex w-full flex-col items-center gap-2" */}
              {/*       > */}
              {/*         {/* Initial View */}
              {/*         <div */}
              {/*           className={`h-2 w-full max-w-64 min-w-28 rounded-md ${colors[idx]}`} */}
              {/*         ></div> */}
              {/*         <span className="w-full text-start text-2xl font-light"> */}
              {/*           {opt.text !== undefined ? opt.text : `Option ${idx}`} */}
              {/*         </span> */}
              {/*       </div> */}
              {/*     ))} */}
              {/* </> */}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 px-4">
        {slide.type === "canvas_slide" && (
          <div className="h-62.5 w-full px-2 py-2 md:h-75 md:px-4 lg:h-100 xl:h-150">
            <FabricJSCanvas
              tool={tool}
              backgroundColor="red"
              slide={slide}
              slides={slides}
              setSlides={setSlides}
              onSave={updateCanvasSlide}
              selectedSlide={selectedSlide}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
