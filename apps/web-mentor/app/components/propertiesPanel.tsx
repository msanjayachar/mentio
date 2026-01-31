"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PropertiesPanel = ({
  commentSelected,
  editSelected,
  handleEdit,
  handleComment,
}: {
  commentSelected: boolean;
  editSelected: boolean;
  handleEdit: () => void;
  handleComment: () => void;
}) => {
  const [selected, setSelected] = useState<"edit" | "comment" | null>(null);

  useEffect(() => {
    if (commentSelected) {
      setSelected("comment");
    } else if (editSelected) {
      setSelected("edit");
    }
  }, [commentSelected, editSelected]);

  return (
    <div
      className={`mt-8 mr-4 flex h-50 w-28 flex-col justify-between gap-2 rounded-md border-2 border-gray-200 bg-white px-2 py-2`}
    >
      <button
        className={`${selected === "edit" ? "border hover:border-blue-900 hover:bg-blue-300/20" : "hover:bg-gray-300/20"} flex h-24 cursor-pointer flex-col items-center justify-around rounded-md px-6 py-2 pt-2`}
        onClick={() => handleEdit()}
      >
        <Image
          src="/icons/edit.svg"
          alt="testing svg images"
          width={35}
          height={35}
        />
        <span>Edit</span>
      </button>
      <button
        className={`${selected === "comment" ? "border hover:border-blue-900 hover:bg-blue-300/20" : "hover:bg-gray-300/20"} flex h-24 cursor-pointer flex-col items-center justify-around rounded-md px-6 py-2 pt-2`}
        onClick={() => handleComment()}
      >
        <Image
          src="/icons/message.svg"
          alt="testing svg images"
          width={20}
          height={20}
        />
        <span>Comments</span>
      </button>
    </div>
  );
};

export default PropertiesPanel;
