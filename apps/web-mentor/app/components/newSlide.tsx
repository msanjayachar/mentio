"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import type { McqQuestion } from "@shared/mcq";
import { ERROR_MESSAGES, SlidesState } from "@shared/types";
import { useCurrentUser } from "./context/authContext";
import { useParams } from "next/navigation";
import { McqApiResponseSchema } from "@shared/api/mcq";
import { CanvasApiResponseSchema } from "@shared/api/canvas";
import { toast } from "sonner";

const NewSlide = ({
  setSlides,
  setShowSlideOption,
}: {
  slides: SlidesState;
  setSlides: Dispatch<SetStateAction<SlidesState>>;
  setShowSlideOption: Dispatch<SetStateAction<boolean>>;
}) => {
  const { token } = useCurrentUser();
  const { presentationId } = useParams<{ presentationId: string }>();

  const emptyMcqSlide = {
    type: "multiple_choice",
    question: "",
    options: [
      {
        id: "1",
        text: "",
        isCorrect: false,
      },
      {
        id: "2",
        text: "",
        isCorrect: false,
      },
    ],
    allowMultiple: false,
  };

  const emptyCanvasSlide = {
    canvasObject: {
      objects: [],
    },
  };

  const createSlide = async (
    slide: Omit<McqQuestion, "id" | "type" | "presentationId" | "createdAt">,
  ) => {
    const url = "http://localhost:8000/slides";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...slide, presentationId }),
    });

    const result = await response.json();
    const parsed = McqApiResponseSchema.safeParse(result);

    if (!parsed.success) {
      toast.error("Unexpected server response one.", {
        position: "top-center",
        style: {
          background: "red",
          color: "white",
        },
      });

      return;
    }

    const res = parsed.data;

    if (res.success) {
      setSlides((prev) => [...prev, res.data]);
      toast.success("Created Mcq Slide", {
        position: "top-center",
        style: {
          background: "green",
          color: "white",
        },
      });
    } else {
      toast.error(ERROR_MESSAGES[res.error] ?? "Unexpected error", {
        position: "top-center",
        style: {
          background: "red",
          color: "white",
        },
      });
    }

    setShowSlideOption(false);
  };

  const createCanvasSlide = async (canvas: Record<string, unknown>) => {
    const url = "http://localhost:8000/canvas";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ presentationId, canvasObject: canvas }),
    });

    const result = await response.json();
    const parsed = CanvasApiResponseSchema.safeParse(result);

    if (!parsed.success) {
      toast.error("Unexpected server response.", {
        position: "top-center",
        style: {
          background: "red",
          color: "white",
        },
      });

      return;
    }

    const res = parsed.data;

    if (res.success) {
      setSlides((prev) => [...prev, res.data]);
      toast.success("Created Canvas Slide", {
        position: "top-center",
        style: {
          background: "green",
          color: "white",
        },
      });
    } else {
      toast.error(ERROR_MESSAGES[res.error] ?? "Unexpected error", {
        position: "top-center",
        style: {
          background: "red",
          color: "white",
        },
      });
    }

    setShowSlideOption(false);
  };

  return (
    <div className="z-50 flex h-full w-full flex-col justify-around gap-2 rounded-lg border-2 border-gray-300 bg-white p-2">
      <button
        className="flex-1 cursor-pointer rounded-md border-2 border-black"
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
