"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

const SpeakerNotes = ({
  handleSpeakerNotes,
}: {
  handleSpeakerNotes: () => void;
}) => {
  const [height, setHeight] = useState(228);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    console.log("height: ", height);
  }, [height]);

  return (
    <div className="relative w-full">
      <div
        // style={{ height, transform: `translateY(${offset}px)` }}
        style={{ height }}
        className="absolute right-0 bottom-0 left-0 flex w-full flex-col overflow-hidden rounded-md border border-gray-200 bg-white"
      >
        <div className="mt-4 flex w-full justify-center">
          <div
            className="h-1.5 w-14 cursor-ns-resize rounded-md bg-gray-200 transition-all duration-100 ease-out hover:w-18"
            onMouseDown={(e) => {
              const startY = e.clientY;
              // const startHeight = height;

              const panel = e.currentTarget.parentElement!
                .parentElement as HTMLElement;
              const startHeight = panel.getBoundingClientRect().height;

              const MAX = 385;
              const MIN = 220;

              const onMove = (e: MouseEvent) => {
                const delta = startY - e.clientY;
                const next = startHeight + delta;

                const clamped = Math.min(MAX, Math.max(MIN, next));

                setHeight(clamped);
                setOffset(-(clamped - startHeight));

                // setHeight(startHeight + delta);
                // setOffset(-delta);
              };

              const onUp = () => {
                document.body.style.userSelect = "none";

                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
              };

              window.addEventListener("mousemove", onMove);
              window.addEventListener("mouseup", onUp);
            }}
          />
        </div>

        <div className="flex justify-end px-4 pt-4">
          <button
            onClick={() => handleSpeakerNotes()}
            className="cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <span className="mb-2 w-full text-center">Speaker notes</span>

        <textarea
          rows={8}
          cols={50}
          className="mx-8 rounded-lg bg-gray-200/70 px-4 py-2 text-lg"
          placeholder="Write some helpful text to fall back on during presentation..."
        />

        <span className="bottom-0 mx-auto my-4 block text-center font-light">
          <span>
            Notes are shown on the <b className="">Mentimote</b>
          </span>
        </span>
      </div>
    </div>
  );
};

export default SpeakerNotes;
