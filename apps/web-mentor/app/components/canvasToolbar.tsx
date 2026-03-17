"use client";

import { useEffect, useState } from "react";

const CanvasToolbar = () => {
  const [tool, setTool] = useState<"text" | "shapes" | "image">("text");

  const handleClick = () => {};

  useEffect(() => {
    console.log("tool: ", tool);
  }, [tool]);

  return (
    <div className="mx-8 flex justify-between gap-2 px-8">
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
