"use client";

import { GripVertical } from "lucide-react";
import { ChangeEvent, useState } from "react";

const PlainTextSlide = () => {
  const [contents, setContents] = useState({
    id: "one",
    title: "",
    description: "",
  });

  const handleContent = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    type: "title" | "description",
  ) => {
    if (type === "title") {
      setContents((prev) => ({
        ...prev,
        title: e.target.value,
      }));
    } else if (type === "description") {
      setContents((prev) => ({
        ...prev,
        description: e.target.value,
      }));
    }
  };

  return (
    <div className="flex h-full w-full flex-col gap-8 px-8 py-4">
      <div className="relative flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="m-2">
            <GripVertical />
          </div>
          <input
            value={contents.title}
            onChange={(e) => handleContent(e, "title")}
            placeholder="Enter your Title"
            className="w-full rounded-lg bg-gray-200 px-2"
          />
        </div>
        <div className="flex justify-between">
          <div className="m-2">
            <GripVertical />
          </div>
          <textarea
            value={contents.description}
            onChange={(e) => handleContent(e, "description")}
            rows={4}
            placeholder="Enter your description here"
            className="w-full rounded-lg bg-gray-200 px-2 py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default PlainTextSlide;
