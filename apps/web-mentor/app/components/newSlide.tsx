"use client";

import Image from "next/image";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import type { McqQuestion, McqOption } from "@shared/mcq";

const NewSlide = ({
  setSlides,
}: {
  slides: McqQuestion[];
  setSlides: Dispatch<SetStateAction<McqQuestion[]>>;
  setShowSlideOption: Dispatch<SetStateAction<boolean>>;
}) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tkn = localStorage.getItem("token");
    setToken(tkn);
  }, []);

  const emptyMcqSlide = {
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

  const createSlide = async (slide: Omit<McqQuestion, "id" | "type">) => {
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

    setSlides((prev) => [...prev, result.data]);
  };

  return (
    <div className="flex h-18 w-full justify-around rounded-lg border-2 border-gray-300 bg-white p-2">
      <button
        className="flex-1 cursor-pointer"
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
    </div>
  );
};

export default NewSlide;
