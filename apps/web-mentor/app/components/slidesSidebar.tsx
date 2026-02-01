"use client";

import { Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import NewSlide from "./newSlide";

const SlidesSidebar = ({
  selected,
  setSelected,
  slides,
  setSlides,
}: {
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
  slides: (MCQSlide | PlainTextSlide)[];
  setSlides: Dispatch<SetStateAction<(MCQSlide | PlainTextSlide)[]>>;
}) => {
  const [showSlideOption, setShowSlideOption] = useState<boolean>(false);

  return (
    <div className="hidden lg:block">
      <div className="relative inline-block">
        <button
          className="mx-auto flex h-12 cursor-pointer items-center gap-2 rounded-full bg-black px-8 text-center text-sm font-light text-white sm:w-44"
          // onClick={() => createSlide()}
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
        <div className="ml-2 flex flex-col gap-4">
          {/* THREAD: */}
          {slides.map((item) => (
            <div
              onClick={() => setSelected(item.id)}
              key={item.id}
              className="flex cursor-pointer"
            >
              <span className="text-[12px]">{item.id}</span>
              <div
                className={`mx-auto h-20 w-36 cursor-pointer rounded-md border-2 border-transparent bg-white hover:border-gray-300 focus:border-2 focus:border-blue-800 ${selected === item.id ? "ring ring-blue-700" : ""}`}
              >
                <span>{item.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlidesSidebar;
