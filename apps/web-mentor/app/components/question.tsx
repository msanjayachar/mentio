"use client";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import type { CanvasSlide, McqOption, McqQuestion } from "@shared/mcq";
import { SlidesState } from "@shared/types";
import { FabricJSCanvas } from "@repo/ui/FabricJSCanvas";
import CanvasToolbar from "./canvasToolbar";

const Question = ({
  tool,
  slides,
  setSlides,
  selectedSlide,
  handleQuestionSelect,
  handleEdit,
}: {
  tool: "text" | "image" | "shapes";
  slides: SlidesState;
  setSlides: Dispatch<SetStateAction<SlidesState>>;
  selectedSlide: string | undefined;
  handleQuestionSelect: () => void;
  handleEdit: () => void;
}) => {
  const [token, setToken] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const [contents, setContents] = useState({
    id: "one",
    title: "",
    description: "",
  });
  // Getting the slide (mcq or canvas) thats selected right now
  const slide =
    (Array.isArray(slides?.mcqSlides)
      ? slides?.mcqSlides?.find((slide) => slide.id === selectedSlide)
      : undefined) ||
    (Array.isArray(slides.canvasSlides)
      ? slides?.canvasSlides?.find((slide) => slide.id === selectedSlide)
      : undefined);

  const colors = [
    "bg-blue-500",
    "bg-rose-400",
    "bg-indigo-300",
    "bg-indigo-900",
    "bg-red-800",
  ];

  const updateCanvasSlide = async (canvasSlide: CanvasSlide) => {
    const url = `http://localhost:8000/canvas/${canvasSlide.id}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ canvasObject: canvasSlide.canvasObject }),
    });

    return response;
  };

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    setToken(tkn);
  }, []);

  const updateSlide = async (slide: McqQuestion) => {
    const url = `http://localhost:8000/slides/${slide!.id}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slide),
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
      updateSlide(updatedSlide);
    }, 600);

    // VERIFY: whether this works as intended
    setSlides((slides) => ({
      ...slides,
      mcqSlides: slides.mcqSlides.map((slide) =>
        slide.id === selectedSlide
          ? {
              ...slide,
              question: e.target.value,
            }
          : slide,
      ),
    }));
  };

  const handleContent = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    type: "title" | "description",
  ) => {
    if (type === "title") {
      setContents((prev) => ({
        ...prev,
        title: e.target.value,
      }));
    } else if (type === "description") {
      setContents((prev) => ({
        ...prev,
        description: e.target.value,
      }));
    }
  };

  if (!slide) return null;

  return (
    <div className="m-8 h-[700px] w-auto rounded-md border-2 bg-white hover:border-blue-800">
      <span className="flex justify-end pt-4 pr-4">Mentio</span>
      <div className="flex flex-col gap-6 px-4">
        {slide.type === "multiple_choice" ? (
          <div className="flex flex-col items-center gap-4 px-8 pt-6">
            <input
              value={slide.question}
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
              className={`mx-8 flex ${slide.type === "multiple_choice" ? "h-[480px]" : "h-[600px]"} w-full cursor-pointer items-end justify-between gap-x-2 rounded-md border-2 px-12 pb-8 hover:border-blue-800`}
              onClick={() => handleEdit()}
            >
              {slide.type === "multiple_choice" &&
                slide.options.map((opt: McqOption, idx: number) => (
                  <div
                    key={opt.id}
                    className="flex w-full flex-col items-center gap-2"
                  >
                    <span className="flex w-full justify-start pl-2 text-2xl font-light">
                      0
                    </span>
                    <div
                      className={`h-2 w-full max-w-64 min-w-28 rounded-md ${colors[idx]}`}
                    />
                    <span className="flex w-full justify-start text-2xl font-light">
                      {/* Option {opt.id} */}
                      {opt.option !== undefined ? opt.option : `Option ${idx}`}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          // TODO: Use this as well
          // <PlainTextSlide />
          <div className="h-[600px] px-4 py-2">
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
        {/* TODO: Dynamic width and height */}
      </div>
    </div>
  );
};

export default Question;
