"use client";

import { ArrowLeft, Plus, X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

// TODO:
// - [ ] Checking multiple options when the toggle isn't on should not be supported

const PresentationHelper = ({
  selected,
  slides,
  setSlides,
  editSelected,
  handleEdit,
}: {
  selected: number;
  slides: (MCQSlide | PlainTextSlide)[];
  setSlides: Dispatch<SetStateAction<(MCQSlide | PlainTextSlide)[]>>;
  editSelected: boolean;
  handleEdit: () => void;
}) => {
  const [selectMultiple, setSelectMultiple] = useState<boolean>(false);
  const [setCorrectAnswer, setSetCorrectAnswer] = useState<boolean>(false);
  const [visualizationType, setVisualizationType] = useState<
    "bar" | "pie" | "split" | "dots" | null
  >(null);
  const slide = slides.find((slide) => slide.id === selected);

  const colors = [
    "bg-blue-500",
    "bg-rose-400",
    "bg-indigo-300",
    "bg-indigo-900",
    "bg-red-800",
  ];

  if (!slide) return;

  const handleOptions = (
    e: ChangeEvent<HTMLInputElement>,
    selected: number,
    optionId: number,
  ) => {
    const last = slide.type === "multiple_choice" ? slide.options.at(-1) : null;

    if (!last) return;

    setSlides((slides) =>
      slides.map((slide) =>
        slide.id === selected && slide.type === "multiple_choice"
          ? {
              ...slide,
              options: slide.options.map((option) =>
                option.id === optionId
                  ? {
                      ...option,
                      text: e.target.value,
                    }
                  : option,
              ),
            }
          : slide,
      ),
    );
  };

  const addOption = () => {
    if (!slide) return null;

    const last = slide.type === "multiple_choice" ? slide.options.at(-1) : null;

    if (!last) return null;

    if (slide.type === "multiple_choice" && slide.options.length == 5)
      return null;

    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === selected && slide.type === "multiple_choice"
          ? {
              ...slide,
              options: [
                ...slide.options,
                {
                  id: last.id + 1,
                  text: "",
                  correctAnswer: false,
                },
              ],
            }
          : slide,
      ),
    );
  };

  const handleCancel = (optionId: number, option: Option) => {
    if (slide.type === "multiple_choice" && slide.options!.length == 2) return;

    setSlides((slides) =>
      slides.map((slide) =>
        slide.id === selected && slide.type === "multiple_choice"
          ? {
              ...slide,
              options: slide.options.filter((option) => option.id !== optionId),
            }
          : slide,
      ),
    );
  };

  return (
    <div className={`${editSelected ? "block" : "hidden"} `}>
      <div className="mx-4 my-8 h-[calc(100vh-8rem)] w-[360px] overflow-y-auto rounded-xl border-2 border-gray-200 bg-white px-8 pb-4">
        <div className="sticky top-0 z-10 mb-8 flex h-20 w-auto items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <ArrowLeft size={16} />
            <span>Multiple Choice</span>
          </div>
          <button className="cursor-pointer" onClick={() => handleEdit()}>
            <X size={16} />
          </button>
        </div>

        <div className="mb-12 flex flex-col justify-between gap-4">
          <div className="flex w-full justify-start">
            <h1>Visualization type</h1>
          </div>

          <div className="flex justify-around">
            <button
              className={`${visualizationType === "bar" ? "border-2 border-blue-600 hover:bg-blue-200/80" : "border border-gray-200 hover:border-blue-600"} flex h-10 w-14 cursor-pointer items-center justify-center rounded-md bg-white transition-all duration-300 ease-out`}
              onClick={() => setVisualizationType("bar")}
            >
              <Image
                src="/visualizations/bar.svg"
                alt="testing svg images"
                width={25}
                height={25}
              />
            </button>
            <button
              className={`${visualizationType === "pie" ? "border-2 border-blue-600 hover:bg-blue-200/80" : "border border-gray-200 hover:border-blue-600"} flex h-10 w-14 cursor-pointer items-center justify-center rounded-md bg-white transition-all duration-300 ease-out`}
              onClick={() => setVisualizationType("pie")}
            >
              <Image
                src="/visualizations/pie.svg"
                alt="testing svg images"
                width={30}
                height={30}
              />
            </button>
            <button
              className={`${visualizationType === "split" ? "border-2 border-blue-600 hover:bg-blue-200/80" : "border border-gray-200 hover:border-blue-600"} flex h-10 w-14 cursor-pointer items-center justify-center rounded-md bg-white transition-all duration-300 ease-out`}
              onClick={() => setVisualizationType("split")}
            >
              <Image
                src="/visualizations/split.svg"
                alt="testing svg images"
                width={30}
                height={30}
              />
            </button>
            <button
              className={`${visualizationType === "dots" ? "border-2 border-blue-600 hover:bg-blue-200/80" : "border border-gray-200 hover:border-blue-600"} flex h-10 w-14 cursor-pointer items-center justify-center rounded-md bg-white transition-all duration-300 ease-out`}
              onClick={() => setVisualizationType("dots")}
            >
              <Image
                src="/visualizations/dots.svg"
                alt="testing svg images"
                width={30}
                height={30}
              />
            </button>
          </div>
        </div>

        <hr className="mb-4 bg-gray-300" />

        {/* Dynamic Options */}
        <div>
          <h1 className="mb-2">Options</h1>
          <div className="flex flex-col gap-2">
            {slide.type === "multiple_choice" ? (
              slide.options.map((option) => (
                <div key={option.id} className="flex items-center gap-4">
                  <div
                    className={`${setCorrectAnswer ? "flex items-center" : "hidden"}`}
                  >
                    <label className="group relative inline-flex h-8 w-8 cursor-pointer items-center justify-center">
                      {/* Real checkbox (invisible but functional) */}
                      <input
                        type="checkbox"
                        className="peer absolute h-0 w-0 opacity-0"
                      />

                      {/* Custom box */}
                      <div className="h-8 w-8 rounded-md border border-gray-400 bg-white transition group-hover:border-2 group-hover:border-[#5E59B3] peer-checked:border-none peer-checked:bg-[#5E59B3] peer-focus:ring-2 peer-focus:ring-blue-400" />

                      {/* Check mark */}
                      <svg
                        className="pointer-events-none absolute h-5 w-5 text-white opacity-0 transition peer-checked:opacity-100"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </label>
                  </div>

                  <div className="flex h-12 items-center gap-2 rounded-md border-3 border-transparent bg-gray-200 focus-within:ring-4 focus-within:ring-blue-800/40 focus-within:ring-offset-2 hover:border-indigo-500">
                    <div
                      className={`ml-2 h-6 w-6 shrink-0 rounded-full ${colors[option.id - 1]}`}
                    />
                    <input
                      value={option.text}
                      onChange={(e) => handleOptions(e, selected, option.id)}
                      placeholder={`Option ${option.id}`}
                      className="w-full min-w-0 font-light outline-none"
                    />
                  </div>

                  <button
                    className="cursor-pointer"
                    onClick={() => handleCancel(option.id, option)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            ) : (
              <div key={slide.id}>Type: {slide.type}</div>
            )}
          </div>

          <button
            onClick={() => addOption()}
            className={`mt-6 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-3xl bg-gray-200 transition-colors hover:bg-gray-300 ${slide.type === "multiple_choice" && slide.options.length >= 5 ? "pointer-events-none cursor-not-allowed bg-gray-300 text-gray-500 opacity-60" : ""}`}
          >
            <Plus size={18} />
            <span className="font-light">Add option</span>
            {/* <span> */}
            {/*   {slide.type === "multiple_choice" && slide.options.length} */}
            {/* </span> */}
          </button>
        </div>

        {/* Additional Options */}

        <div className="mt-8 flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-light">
                Choose correct answers{" "}
              </span>
              <div className="flex h-4 w-4 items-center justify-center rounded-full border border-black text-[10px] leading-none font-semibold text-gray-700">
                ?
              </div>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                onChange={() => setSetCorrectAnswer((prev) => !prev)}
              />

              <div className="h-6 w-11 rounded-full bg-gray-300 transition-colors duration-200 peer-checked:bg-blue-600"></div>

              <div className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-5"></div>
            </label>
          </div>

          <div className="flex justify-between">
            <span className="text-sm font-light">Select multiple options</span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                onChange={() => setSelectMultiple((prev) => !prev)}
                className="peer sr-only"
              />

              <div className="h-6 w-11 rounded-full bg-gray-300 transition-colors duration-200 peer-checked:bg-blue-600" />

              <div className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-5" />
            </label>
          </div>

          <div
            className={`items-center gap-2 ${selectMultiple ? "flex" : "hidden"}`}
          >
            <span className="text-sm font-light">
              Selections per participant
            </span>
            <input
              type="number"
              min="2"
              max="3"
              step="1"
              defaultValue="2"
              className="h-10 w-20 rounded-lg bg-gray-300 px-2 text-sm font-light"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationHelper;
