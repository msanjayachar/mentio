"use client";

import PresentationNav from "./presentationNav";
import Question from "./question";
import PresentationHelper from "./presentationHelper";
import PropertiesPanel from "./propertiesPanel";
import { useState } from "react";
import SpeakerNotes from "./speakerNotes";
import Comments from "./edit/comments";
import Questionpanel from "./edit/questionpanel";
import { useRouter } from "next/navigation";
import SlidesSidebar from "./slidesSidebar";
import { slides as initialSlides } from "data/slides";

const Presentations = () => {
  const [speakerNotes, setSpeakerNotes] = useState(false);
  const [selected, setSelected] = useState<number>(1);
  const [editSelected, setEditSelected] = useState<boolean>(false);
  const [commentSelected, setCommentSelected] = useState<boolean>(false);
  const [questionSelected, setQuestionSelected] = useState<boolean>(false);
  const [slides, setSlides] = useState(initialSlides);
  const navigate = useRouter();

  const handleSpeakerNotes = () => {
    setSpeakerNotes((prev) => !prev);
  };

  const handleEdit = () => {
    setEditSelected((prev) => !prev);
    setCommentSelected(false);
    setQuestionSelected(false);
  };

  const handleComment = () => {
    console.log("hello from handleComment");
    setCommentSelected((prev) => !prev);
    setEditSelected(false);
    setQuestionSelected(false);
  };

  const handleQuestionSelect = () => {
    setQuestionSelected((prev) => !prev);
    setEditSelected(false);
    setCommentSelected(false);
  };

  return (
    <div className="relative h-screen overflow-hidden bg-[#F2F1F0]">
      <PresentationNav slides={slides} />
      <div className="flex flex-col">
        <div className="flex">
          <SlidesSidebar
            selected={selected}
            setSelected={setSelected}
            slides={slides}
            setSlides={setSlides}
          />

          {/* <PresentationStarters /> */}
          {/* Canvas Input  */}
          <div className="mb-4 flex min-w-0 flex-1 flex-col justify-between">
            <Question
              slides={slides}
              setSlides={setSlides}
              selected={selected}
              handleEdit={handleEdit}
              handleQuestionSelect={handleQuestionSelect}
            />

            <button
              className="mx-16 h-16 w-auto cursor-pointer items-center rounded-lg pb-8 text-lg font-light hover:bg-white"
              onClick={() => setSpeakerNotes((prev) => !prev)}
            >
              Speaker Notes
            </button>
            <div className={`${speakerNotes ? "block" : "hidden"} mx-16`}>
              <SpeakerNotes handleSpeakerNotes={handleSpeakerNotes} />
            </div>
          </div>

          <div className="flex shrink-0">
            <PresentationHelper
              selected={selected}
              slides={slides}
              setSlides={setSlides}
              handleEdit={handleEdit}
              editSelected={editSelected}
            />
            <Comments
              handleComment={handleComment}
              commentSelected={commentSelected}
            />

            <Questionpanel
              handleQuestionSelect={handleQuestionSelect}
              questionSelected={questionSelected}
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
    </div>
  );
};

export default Presentations;
