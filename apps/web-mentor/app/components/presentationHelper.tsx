"use client";

import { ArrowLeft, Plus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const PresentationHelper = ({
  editSelected,
  handleEdit,
}: {
  editSelected: boolean;
  handleEdit: () => void;
}) => {
  const [selectMultiple, setSelectMultiple] = useState<boolean>(false);
  const [setCorrectAnswer, setSetCorrectAnswer] = useState<boolean>(false);
  const [visualizationType, setVisualizationType] = useState<
    "bar" | "pie" | "split" | "dots" | null
  >(null);

  return (
    <div className={`${editSelected ? "block" : "hidden"}`}>
      <div className="mx-4 my-8 h-[calc(100vh-8rem)] w-[360px] rounded-xl border-2 border-gray-200 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ArrowLeft size={16} />
            <span>Multiple Choice</span>
          </div>
          <button onClick={() => handleEdit()}>
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

        <div>
          <h1 className="mb-2">Options</h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
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

              <div className="flex h-12 items-center gap-2 rounded-md bg-gray-200">
                <div className="ml-2 h-6 w-6 shrink-0 rounded-full bg-blue-500" />
                <input
                  placeholder="Option 1"
                  className="w-full min-w-0 font-light"
                />
              </div>

              <X size={16} />
            </div>

            <div className="flex w-full items-center gap-4">
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

              <div className="flex h-12 items-center gap-2 rounded-md bg-gray-200">
                <div className="ml-2 h-6 w-6 shrink-0 rounded-full bg-red-400" />
                <input
                  placeholder="Option 2"
                  className="w-full min-w-0 font-light"
                />
              </div>

              <X size={16} />
            </div>

            <div className="flex items-center gap-4">
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
              <div className="flex h-12 items-center gap-2 rounded-md bg-gray-200">
                <div className="ml-2 h-6 w-6 shrink-0 rounded-full bg-blue-900" />
                <input
                  placeholder="Option 3"
                  className="w-full min-w-0 font-light"
                />
              </div>

              <X size={16} />
            </div>
          </div>
        </div>

        <button className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-3xl bg-gray-200">
          <Plus size={18} />
          <span className="font-light">Add option</span>
        </button>

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

              <div className="h-6 w-11 rounded-full bg-gray-300 transition-colors duration-200 peer-checked:bg-blue-600"></div>

              <div className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-5"></div>
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
