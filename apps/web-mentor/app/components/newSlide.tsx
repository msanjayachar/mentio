"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import type { McqQuestion, McqOption } from "@shared/mcq";
import { SlidesState } from "@shared/types";

const NewSlide = ({
  setSlides,
  setShowSlideOption,
}: {
  slides: SlidesState;
  setSlides: Dispatch<SetStateAction<SlidesState>>;
  setShowSlideOption: Dispatch<SetStateAction<boolean>>;
}) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    setToken(tkn);
  }, []);

  const emptyMcqSlide = {
    id: "one",
    type: "multiple_choice",
    question: "",
    options: [
      {
        id: "1",
        option: "",
        correctAnswer: false,
      },
      {
        id: "2",
        option: "",
        correctAnswer: false,
      },
    ],
    correctAnswers: [],
    allowMultiple: false,
  };

  const emptyCanvasSlide = {
    id: "one",
    object: {},
  };

  const createSlide = async (
    slide: Omit<McqQuestion, "id" | "type" | "createdAt">,
  ) => {
    const url = "http://localhost:8000/slides";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slide),
    });

    const result = await response.json();

    setShowSlideOption(false);
    setSlides((prev) => ({
      ...prev,
      mcqSlides: [...prev.mcqSlides, result.data.slide],
    }));
  };

  const createCanvasSlide = async (canvas: Record<string, unknown>) => {
    const url = "http://localhost:8000/canvas";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(canvas),
    });

    const result = await response.json();

    setShowSlideOption(false);

    setSlides((prev) => ({
      ...prev,
      canvasSlides: [...prev.canvasSlides, result.data.slide],
    }));
  };

  return (
    <div className="z-50 flex h-full w-full flex-col justify-around gap-2 rounded-lg border-2 border-gray-300 bg-white p-2">
      <button
        className="flex-1 cursor-pointer rounded-md border-2 border-black"
        // TODO: - use a single function to create slide. "pass the slide type as argument."
        // onClick={() => createSlide("multiple_choice")}
        onClick={() => createSlide(emptyMcqSlide)}
      >
        <div className="flex items-center">
          <Image
            src="/features/poll_two.svg"
            alt="testing svg images"
            width={50}
            height={50}
          />

          <span className="m-auto w-full cursor-pointer text-sm">
            Multiple Choice
          </span>
        </div>
      </button>

      <button
        className="flex-1 cursor-pointer rounded-md border-2 border-black"
        onClick={() => createCanvasSlide(emptyCanvasSlide)}
      >
        <div className="flex items-center">
          <Image
            src="/features/poll_two.svg"
            alt="testing svg images"
            width={50}
            height={50}
          />

          <span className="m-auto w-full cursor-pointer text-sm">
            Canvas Slide
          </span>
        </div>
      </button>
    </div>
  );
};

export default NewSlide;
