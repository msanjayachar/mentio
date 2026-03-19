"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const CanvasToolbar = ({
  tool,
  setTool,
}: {
  tool: "text" | "image" | "shapes";
  setTool: Dispatch<SetStateAction<"text" | "image" | "shapes">>;
}) => {
  return (
    <div className="mx-8 flex justify-between gap-2 px-8">
      <div>Selected Tool: {tool}</div>

      <button
        className="h-8 w-24 cursor-pointer rounded-sm bg-slate-200 px-2"
        onClick={() => setTool("text")}
      >
        Text
      </button>
      <button
        className="h-8 w-24 cursor-pointer rounded-sm bg-slate-200 px-2"
        onClick={() => setTool("shapes")}
      >
        Shapes
      </button>
      <button
        className="h-8 w-24 cursor-pointer rounded-sm bg-slate-200 px-2"
        onClick={() => setTool("image")}
      >
        Image
      </button>
    </div>
  );
};

export default CanvasToolbar;
