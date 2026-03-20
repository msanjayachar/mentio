"use client";

import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NewSlide from "./newSlide";
import { SlidesState, SlidesStateTest } from "@shared/types";
import { CanvasSlide, McqQuestion } from "@shared/mcq";
import {
  fetchCanvasSlides,
  fetchSlides,
  formatTime,
  getEpochSeconds,
} from "@/lib/utils";
import { useCurrentUser } from "./context/authContext";

const SlidesSidebar = ({
  selected,
  setSelected,
  slides,
  setSlides,
}: {
  selected: string | undefined;
  setSelected: Dispatch<SetStateAction<string | undefined>>;
  slides: SlidesStateTest;
  setSlides: Dispatch<SetStateAction<SlidesStateTest>>;
}) => {
  const [showSlideOption, setShowSlideOption] = useState<boolean>(false);
  const { token } = useCurrentUser();

  // VERIFY:
  if (!token) return null;

  // NOTE: This is where we fetch the slides on page load
  useEffect(() => {
    const loadSlides = async () => {
      const response = await fetchSlides(token);
      const result = await response.json();

      const response_two = await fetchCanvasSlides(token);
      const result_two = await response_two.json();

      setSlides(
        [...result.data.slides, ...result_two.data.slides].sort((a, b) => {
          const timeA = getEpochSeconds(a.createdAt);
          const timeB = getEpochSeconds(b.createdAt);

          if (timeA === null) return 1;
          if (timeB === null) return -1;

          return timeA - timeB;
        }),
      );
    };

    loadSlides();
  }, []);

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
              slides.map((slide) =>
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
                      <span className="text-sm text-red-800">
                        {formatTime(slide.createdAt)}
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
                      <span className="text-sm text-red-800">
                        {formatTime(slide.createdAt)}
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
