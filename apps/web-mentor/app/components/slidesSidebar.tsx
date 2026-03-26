"use client";

import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import NewSlide from "./newSlide";
import { ERROR_MESSAGES, SlidesState } from "@shared/types";
import { fetchCanvasSlides, fetchSlides, getEpochSeconds } from "@/lib/utils";
import { useCurrentUser } from "./context/authContext";
import { McqApiResponseSchema, McqsApiResponseSchema } from "@shared/api/mcq";
import { toast } from "sonner";
import {
  CanvasApiResponseSchema,
  CanvasesApiResponseSchema,
} from "@shared/api/canvas";

const SlidesSidebar = ({
  presentationId,
  selected,
  setSelected,
  slides,
  setSlides,
}: {
  presentationId: string;
  selected: string | undefined;
  setSelected: Dispatch<SetStateAction<string>>;
  slides: SlidesState;
  setSlides: Dispatch<SetStateAction<SlidesState>>;
}) => {
  const [showSlideOption, setShowSlideOption] = useState<boolean>(false);
  const isMountedRef = useRef(true);
  const { token } = useCurrentUser();

  useEffect(() => {
    const presentationSlides = slides.filter(
      (slide) => slide.presentationId === presentationId,
    );

    if (presentationSlides && !selected && presentationSlides[0]) {
      setSelected(presentationSlides[0]?.id);
    }
  }, [slides, selected]);

  useEffect(() => {
    isMountedRef.current = true;

    const loadSlides = async () => {
      if (!token) return null;

      const [response_mcq, response_canvas] = await Promise.all([
        fetchSlides(token),
        fetchCanvasSlides(token),
      ]);

      const [result_mcq, result_canvas] = await Promise.all([
        response_mcq.json(),
        response_canvas.json(),
      ]);

      const parsed_mcq = McqsApiResponseSchema.safeParse(result_mcq);
      const parsed_canvas = CanvasesApiResponseSchema.safeParse(result_canvas);

      if (!parsed_mcq.success || !parsed_canvas.success) {
        toast.error("Unexpected server response FOUR", {
          position: "top-center",
          style: {
            background: "red",
            color: "white",
          },
        });

        return;
      }

      const res_mcq = parsed_mcq.data;
      const res_canvas = parsed_canvas.data;

      if (res_mcq.success && res_canvas.success) {
        if (isMountedRef.current) {
          // setSlides([...res_mcq.data, ...res_canvas.data]);

          setSlides(
            [...res_mcq.data, ...res_canvas.data].sort((a, b) => {
              const timeA = getEpochSeconds(a.createdAt);
              const timeB = getEpochSeconds(b.createdAt);

              if (timeA === null) return 1;
              if (timeB === null) return -1;

              return timeA - timeB;
            }),
          );
        }

        toast.success("Mcq Slide", {
          position: "top-center",
          style: {
            background: "green",
            color: "white",
          },
        });
      } else {
        if (res_mcq.error) {
          toast.error(ERROR_MESSAGES[res_mcq.error] ?? "Unexpected error", {
            position: "top-center",
            style: {
              background: "red",
              color: "white",
            },
          });
        }

        if (res_canvas.error) {
          toast.error(ERROR_MESSAGES[res_canvas.error] ?? "Unexpected error", {
            position: "top-center",
            style: {
              background: "red",
              color: "white",
            },
          });
        }
      }
    };

    loadSlides();

    return () => {
      isMountedRef.current = false;
    };
  }, [token]);

  if (!token) return null;

  return (
    <div className="hidden lg:block">
      <div className="relative inline-block">
        <button
          className="mx-auto flex h-12 cursor-pointer items-center gap-2 rounded-full bg-black px-8 text-center text-sm font-light text-white sm:w-44"
          onClick={() => setShowSlideOption((prev) => !prev)}
        >
          <Plus size={20} strokeWidth={1} />
          <span>New slide</span>
        </button>

        {showSlideOption && (
          <div className="absolute mt-2 w-80">
            <NewSlide
              slides={slides}
              setSlides={setSlides}
              setShowSlideOption={setShowSlideOption}
            />
          </div>
        )}
      </div>

      <div className="flex h-[calc(100vh-80px)] w-48 flex-col gap-4 overflow-auto pt-4">
        {slides ? (
          <div className="ml-2 flex flex-col gap-4">
            {Array.isArray(slides) &&
              slides
                .filter((slide) => slide.presentationId === presentationId)
                .map((slide) =>
                  slide.type === "canvas_slide" ? (
                    <div
                      onClick={() => setSelected(slide.id)}
                      key={slide.id}
                      className="flex cursor-pointer"
                    >
                      {/* <span className="text-[12px]">{item.id}</span> */}
                      <div className="flex flex-col gap-2 p-2">
                        <span className="text-sm text-red-800">
                          {slide.id.slice(0, 4)}...{slide.id.slice(-3)}
                        </span>
                      </div>

                      {/* <span className="text-sm text-red-800">{selected}</span> */}
                      <div
                        className={`mx-auto h-20 w-36 cursor-pointer rounded-md border-2 border-transparent bg-white hover:border-gray-300 focus:border-2 focus:border-blue-800 ${selected === slide.id ? "ring ring-blue-700" : ""}`}
                      >
                        <span>{slide.type}</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => setSelected(slide.id)}
                      // key={slide.id}
                      key={crypto.randomUUID()}
                      className="flex cursor-pointer"
                    >
                      {/* <span className="text-[12px]">{item.id}</span> */}
                      <div className="flex flex-col gap-2 p-2">
                        <span className="text-sm text-red-800">
                          {slide.id.slice(0, 4)}...{slide.id.slice(-3)}
                        </span>
                      </div>

                      {/* <span className="text-sm text-red-800">{selected}</span> */}
                      <div
                        className={`mx-auto h-20 w-36 cursor-pointer rounded-md border-2 border-transparent bg-white hover:border-gray-300 focus:border-2 focus:border-blue-800 ${selected === slide.id ? "ring ring-blue-700" : ""}`}
                      >
                        <span>{slide.type}</span>
                      </div>
                    </div>
                  ),
                )}
          </div>
        ) : (
          <div>No slides</div>
        )}
      </div>
    </div>
  );
};

export default SlidesSidebar;
