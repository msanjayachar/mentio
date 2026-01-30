"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import PresentationNav from "./presentationNav";
import PresentationStarters from "./presentationStarters";
import Question from "./question";
import PresentationHelper from "./presentationHelper";
import PropertiesPanel from "./propertiesPanel";
import { useState } from "react";
import { slides as initialSlides } from "data/slides";
import SpeakerNotes from "./speakerNotes";
import Comments from "./edit/comments";

const Presentations = () => {
  const [slides, setSlides] = useState(initialSlides);
  const [selected, setSelected] = useState({
    id: 1,
    type: "multiple_choice",
    question: "What is the capital of Karnataka?",
    options: ["Bengaluru", "Tumakuru", "Mysuru", "Mangalore"],
    correctAnswers: [],
    allowMultiple: false,
    required: true,
  });
  const [editSelected, setEditSelected] = useState<boolean>(false);
  const [commentSelected, setCommentSelected] = useState<boolean>(false);

  const createSlide = () => {};

  const handleEdit = () => {
    setEditSelected((prev) => !prev);
    setCommentSelected(false);
  };

  const handleComment = () => {
    console.log("hello from handleComment");
    setCommentSelected((prev) => !prev);
    setEditSelected(false);
  };

  return (
    <div className="relative">
      <PresentationNav />
      <div className="flex">
        <div className="hidden lg:block">
          <div className="flex h-[calc(100vh-80px)] w-48 flex-col gap-4 pt-4">
            <button
              className="mx-auto flex h-10 cursor-pointer items-center gap-2 rounded-full bg-black px-8 text-center text-sm font-light text-white sm:w-44"
              onClick={() => createSlide()}
            >
              <Plus size={20} strokeWidth={1} />
              <span>New slide</span>
            </button>
            <div className="ml-2 flex flex-col gap-4">
              {slides.map((item) => (
                <div key={item.id} className="flex">
                  <span className="text-[12px]">{item.id}</span>
                  <div
                    className={`mx-auto h-20 w-36 cursor-pointer rounded-md border-2 border-transparent bg-gray-100 hover:border-gray-300 focus:border-2 focus:border-blue-800 ${selected.id === item.id ? "border-none ring-2 ring-blue-700" : ""}`}
                  >
                    <span>{item.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <PresentationStarters /> */}
        <Question />

        <div className="absolute bottom-0 flex w-[800px] items-center justify-center">
          <SpeakerNotes />
        </div>
        <div className="flex">
          <PresentationHelper
            handleEdit={handleEdit}
            editSelected={editSelected}
          />
          <Comments
            handleComment={handleComment}
            commentSelected={commentSelected}
          />
          <PropertiesPanel
            commentSelected={commentSelected}
            editSelected={editSelected}
            handleComment={handleComment}
            handleEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Presentations;
