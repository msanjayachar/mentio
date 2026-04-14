// mentee view
"use client";

import { socket } from "@shared/socket";
import { Mentee, Presentation, SlideState } from "@shared/types";
import { getChannel } from "@shared/channel";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Present from "@ui/Present";

const page = () => {
  const [slide, setSlide] = useState<SlideState | null>(null);
  const [isPresenting, setIsPresenting] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState<Set<string>>(
    new Set(),
  );
  const { roomId } = useParams<{ roomId: string }>();
  const [presentationEnded, setPresentationEnded] = useState(false);
  const [presentation, setPresentation] = useState<Presentation | undefined>(
    undefined,
  );
  const [mentee, setMentee] = useState<Mentee | undefined>(undefined);
  const channel = getChannel();

  const handleSubmitAnswer = (questionId: string, answer: string) => {
    socket.emit("submit-answer", {
      menteeId: mentee!.id,
      presentationId: presentation!.id,
      roomId,
      questionId,
      answer,
    });
    setSubmittedAnswers((prev) => new Set(prev).add(questionId));
  };

  const handlePresentationEnd = () => {
    console.log("presentation-ended");
    setPresentationEnded(true);
  };

  useEffect(() => {
    if (!roomId) return;

    const handleReceive = (receivedSlide: any) => {
      console.log("received slide");
      setSlide(receivedSlide);
      setIsPresenting(true);
      setSubmittedAnswers(new Set());
    };

    socket.on("receive-slide", handleReceive);
    socket.on("presentation-ended", handlePresentationEnd);

    channel.join(roomId);

    return () => {
      socket.off("receive-slide", handleReceive);
      channel.leave();
    };
  }, [roomId, channel]);

  const slideType = (slide as { type?: string })?.type;
  const canInteract = slideType === "multiple_choice";

  useEffect(() => {
    const loadPresentation = async () => {
      const response = await fetch(
        `http://localhost:8000/presentations/room/${roomId}`,
      );

      const result = await response.json();

      if (result) {
        setPresentation(result.data);
      }
    };

    loadPresentation();
  }, []);

  useEffect(() => {
    console.log("*************************");
    console.log("mentee: ", mentee);
    console.log("*************************");
  }, [mentee]);

  useEffect(() => {
    const createMentee = async () => {
      if (presentation) {
        const response = await fetch("http://localhost:8000/mentees", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ presentationId: presentation.id }),
        });

        const result = await response.json();

        setMentee(result.data);
      }
    };

    createMentee();
  }, [presentation]);

  if (!presentation || !mentee)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-2xl text-black">No presentation</h1>
      </div>
    );

  return (
    <div className="flex h-screen w-full flex-col bg-slate-100 text-black">
      <div className="w-full bg-red-50 py-4 text-center">
        <p className="text-3xl font-thin text-red-500">{roomId}</p>
      </div>

      {presentationEnded ? (
        <div className="flex flex-1 items-center justify-center text-2xl font-normal">
          <h1 className="text-blue-500">Presentation Ended</h1>
        </div>
      ) : isPresenting && slide ? (
        <div>
          <Present
            slide={slide}
            roomId={roomId}
            onSubmitAnswer={handleSubmitAnswer}
            readOnly={submittedAnswers.has(slide.id)}
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center text-2xl font-normal">
          <h1 className="text-blue-500">
            Please wait for the host to start the Presentation...
          </h1>
        </div>
      )}
    </div>
  );
};

export default page;
