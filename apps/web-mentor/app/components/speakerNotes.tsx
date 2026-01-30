"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

const SpeakerNotes = () => {
  const [height, setHeight] = useState(192);
  const [offset, setOffset] = useState(0);

  return (
    <div className="relative w-full">
      <div
        style={{ height, transform: `translateY(${offset}px)` }}
        className="absolute right-0 bottom-0 left-0 flex w-full flex-col overflow-hidden rounded-md border border-gray-200 bg-white"
      >
        <div className="my-4 flex w-full justify-center">
          <div
            className="h-1.5 w-14 cursor-ns-resize rounded-md bg-gray-200 transition-all duration-100 ease-out hover:w-18"
            onMouseDown={(e) => {
              const startY = e.clientY;
              // const startHeight = height;

              const panel = e.currentTarget.parentElement!
                .parentElement as HTMLElement;
              const startHeight = panel.getBoundingClientRect().height;

              const MAX = 480;
              const MIN = 120;

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
          <X size={16} />
        </div>
        <span className="my-4 w-full text-center">Speaker notes</span>
        <input
          className="mx-8 h-20 rounded-lg bg-gray-200/70 px-4 text-lg"
          placeholder="Write some helpful text to fall back on during presentation..."
        />

        {/* TODO: */}
        <span className="my-4 text-center font-light">
          Notes are shown on the <b className="">Mentimote</b>
        </span>
      </div>
    </div>
  );
};

export default SpeakerNotes;
