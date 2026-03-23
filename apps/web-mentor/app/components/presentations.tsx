"use client";

import PresentationNav from "./presentationNav";
import Question from "./question";
import PresentationHelper from "./presentationHelper";
import PropertiesPanel from "./propertiesPanel";
import { useEffect, useState } from "react";
import SpeakerNotes from "./speakerNotes";
import Comments from "./edit/comments";
import Questionpanel from "./edit/questionpanel";
import SlidesSidebar from "./slidesSidebar";
import { SlidesState } from "@shared/types";
import { FabricJSCanvas } from "@repo/ui/FabricJSCanvas";
import CanvasToolbar from "./canvasToolbar";
import { useCurrentUser } from "./context/authContext";

const Presentations = () => {
  const [speakerNotes, setSpeakerNotes] = useState(false);
  const [editSelected, setEditSelected] = useState<boolean>(false);
  const [commentSelected, setCommentSelected] = useState<boolean>(false);
  const [questionSelected, setQuestionSelected] = useState<boolean>(false);
  const [slides, setSlides] = useState<SlidesState>([]);
  const [selectedSlide, setSelectedSlide] = useState<string | undefined>(
    undefined,
  );
  const [tool, setTool] = useState<"text" | "image" | "shapes">("text");
  const { token } = useCurrentUser();

  // Q: What are we trying to do here?
  useEffect(() => {
    if (slides && !selectedSlide) {
      setSelectedSlide(slides[0]?.id);
    }
  }, [slides, selectedSlide]);

  const handleSpeakerNotes = () => {
    setSpeakerNotes((prev) => !prev);
  };

  const handleEdit = () => {
    setEditSelected((prev) => !prev);
    setCommentSelected(false);
    setQuestionSelected(false);
  };

  const handleComment = () => {
    setCommentSelected((prev) => !prev);
    setEditSelected(false);
    setQuestionSelected(false);
  };

  const handleQuestionSelect = () => {
    setQuestionSelected((prev) => !prev);
    setEditSelected(false);
    setCommentSelected(false);
  };

  if (!slides) return;

  return (
    <div className="relative h-screen overflow-hidden bg-[#F2F1F0]">
      <PresentationNav slides={slides} />
      <div className="flex flex-col">
        <div className="flex">
          <SlidesSidebar
            selected={selectedSlide}
            setSelected={setSelectedSlide}
            slides={slides}
            setSlides={setSlides}
          />

          {/* <PresentationStarters /> */}
          {/* Canvas Input  */}
          <div className="mb-4 flex min-w-0 flex-1 flex-col justify-between">
            <CanvasToolbar tool={tool} setTool={setTool} />
            <Question
              tool={tool}
              slides={slides}
              setSlides={setSlides}
              selectedSlide={selectedSlide}
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
              selectedSlide={selectedSlide!}
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
