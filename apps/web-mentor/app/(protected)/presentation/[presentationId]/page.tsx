// mentor view
"use client";

import { useCurrentUser } from "@/app/components/context/authContext";
import Present from "@ui/Present";
import { fetchCanvasSlides, fetchSlides } from "@/lib/utils";
import { CanvasesApiResponseSchema } from "@shared/api/canvas";
import { McqsApiResponseSchema } from "@shared/api/mcq";
import { PresentationType } from "@shared/presentation";
import { getChannel } from "@shared/channel";
import { socket } from "@shared/socket";
import type { AppEvent } from "@shared/events";
import { ERROR_MESSAGES, SlidesState, SlideState } from "@shared/types";
import { ArrowLeft, ArrowRight, LucideToggleRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { format } from "path";

type Answer = {
  participantId: string;
  answer: string;
};
type QuestionId = string;

export default function Page() {
  const { presentationId } = useParams<{ presentationId: string }>();
  const [presentation, setPresentation] = useState<PresentationType | null>(
    null,
  );
  const [slides, setSlides] = useState<SlidesState | null>(null);
  const [slide, setSlide] = useState<SlideState | null>(null);
  const [index, setIndex] = useState(0);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [result, setResult] = useState<boolean>(false);
  const [participants, setParticipants] = useState<
    { id: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<Record<QuestionId, Answer[]>>({});
  const [timer, setTimer] = useState(30);

  const { token, loading: tokenLoading } = useCurrentUser();
  const channel = getChannel();

  const presentationSlides = useMemo(
    () => slides?.filter((s) => s.presentationId === presentationId) ?? [],
    [slides, presentationId],
  );

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((time) => {
        return time - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (tokenLoading || !token || !presentationId) return;
    setLoading(false);
  }, [token, tokenLoading, presentationId]);

  useEffect(() => {
    if (!token || !presentationId) return;

    const getPresentation = async (id: string) => {
      const url = `http://localhost:8000/presentations/${id}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      setRoomId(result.data.roomId);
    };

    getPresentation(presentationId);
  }, [token, presentationId]);

  // We set slide here.
  useEffect(() => {
    if (!presentationSlides.length || index >= presentationSlides.length)
      return;
    const currentSlide = presentationSlides[index];
    if (currentSlide) setSlide(currentSlide);
  }, [presentationSlides, index]);

  useEffect(() => {
    channel.sendTimer(timer);
  }, [timer]);

  useEffect(() => {
    if (!slide || !roomId) return;
    channel.sendSlideChange(index, slide);
  }, [slide, roomId, index, channel]);

  useEffect(() => {
    if (!token) return;

    const loadSlides = async () => {
      const response_mcq = await fetchSlides(token);
      const result_mcq = await response_mcq.json();

      const response_canvas = await fetchCanvasSlides(token);
      const result_canvas = await response_canvas.json();

      const parsed_mcq = McqsApiResponseSchema.safeParse(result_mcq);
      const parsed_canvas = CanvasesApiResponseSchema.safeParse(result_canvas);

      if (!parsed_mcq.success || !parsed_canvas.success) {
        toast.error("Unexpected server response", {
          position: "top-center",
          style: { background: "red", color: "white" },
        });
        return;
      }

      const res_mcq = parsed_mcq.data;
      const res_canvas = parsed_canvas.data;

      if (res_mcq.success && res_canvas.success) {
        setSlides([...res_mcq.data, ...res_canvas.data]);
        toast.success("Slides loaded", {
          position: "top-center",
          style: { background: "green", color: "white" },
        });
      } else {
        if (res_mcq.error) {
          toast.error(ERROR_MESSAGES[res_mcq.error] ?? "Unexpected error", {
            position: "top-center",
            style: { background: "red", color: "white" },
          });
        }
        if (res_canvas.error) {
          toast.error(ERROR_MESSAGES[res_canvas.error] ?? "Unexpected error", {
            position: "top-center",
            style: { background: "red", color: "white" },
          });
        }
      }
    };

    loadSlides();
  }, [token]);

  useEffect(() => {
    if (!presentationId || !token) return;

    const loadPresentation = async () => {
      const url = `http://localhost:8000/presentations/${presentationId}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setPresentation(result.data);
    };
    loadPresentation();
  }, [presentationId, token]);

  useEffect(() => {
    if (!roomId) return;

    channel.join(roomId);

    const unsubscribe = channel.subscribe((event: AppEvent) => {
      switch (event.type) {
        case "ROOM_JOINED":
          setParticipants(event.participants);
          break;
        case "PARTICIPANT_JOINED":
          setParticipants((prev) => [...prev, event.participant]);
          break;
        case "PARTICIPANT_LEFT":
          setParticipants((prev) =>
            prev.filter((p) => p.id !== event.participantId),
          );
          break;
      }
    });

    return () => {
      unsubscribe();
      channel.leave();
    };
  }, [roomId, channel]);

  useEffect(() => {
    if (!roomId) return;

    const handleAnswerSubmitted = (data: {
      questionId: string;
      answer: string;
      participantId: string;
    }) => {
      // AT_HERE: result. Show the result of each slide response to the mentee
      const result =
        slide?.type === "multiple_choice"
          ? slide.options.find((opt) => opt.id === data.answer)
          : null;

      // VERIFY:
      if (!result) return;

      setResult(result.isCorrect);

      setAnswers((prev) => ({
        ...prev,
        [data.questionId]: [
          ...(prev[data.questionId] || []),
          { participantId: data.participantId, answer: data.answer },
        ],
      }));
    };

    socket.on("answer-submitted", handleAnswerSubmitted);

    return () => {
      socket.off("answer-submitted", handleAnswerSubmitted);
    };
  }, [roomId, slide]);

  const currentAnswers = slide?.id ? answers[slide.id] || [] : [];

  if (loading || tokenLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!presentation) return null;
  if (!slide) return <div>No slide</div>;
  if (!slides) return <div>Loading slides...</div>;

  const nextSlide = () => {
    setTimer(30);
    if (slides && slides.length - 1 > index) {
      setIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (slides && index >= 0) setIndex((prev) => prev - 1);
  };

  const endPresentation = () => {
    console.log("Presentation Ended");
    channel.sendPresentationEnd();
  };

  const handleResult = () => {
    channel.sendResult(result);
  };

  return (
    <div className="flex h-screen flex-col bg-slate-100 p-4">
      <h1 className="text-4xl text-red-500">Room: {roomId}</h1>

      <div>
        <h1>{timer == 0 ? "Time's up." : timer}</h1>
      </div>

      <button
        className="h-12 w-full cursor-pointer rounded-lg bg-blue-500"
        onClick={() => handleResult()}
      >
        Show Result
      </button>

      <Present slide={slide} roomId={roomId} readOnly />

      <div className="mt-auto ml-12 flex w-fit gap-2 text-sm font-light">
        <button
          type="button"
          className="flex cursor-pointer rounded-full bg-gray-300/30 p-2"
          onClick={prevSlide}
          disabled={index === 0}
        >
          <ArrowLeft size={18} strokeWidth={1.2} />
        </button>
        {presentationSlides && index < presentationSlides.length - 1 ? (
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-300/30 p-2 text-[12px]"
            onClick={nextSlide}
          >
            <ArrowRight size={18} strokeWidth={1.2} />
            Next Slide
          </button>
        ) : (
          <button
            type="button"
            className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-300/30 p-2 text-[12px]"
            onClick={endPresentation}
          >
            <ArrowRight size={18} strokeWidth={1.2} />
            End presentation
          </button>
        )}
      </div>

      <div>
        <h3 className="text-3xl text-red-300">List of participants: </h3>
        {participants.length > 0 &&
          participants.map((participant) => (
            <p key={participant.id} className="text-4xl text-blue-500">
              {participant.name}
            </p>
          ))}
      </div>

      {currentAnswers.length > 0 && (
        <div className="mt-4 rounded bg-green-100 p-4">
          <h3 className="text-xl font-bold">Answers received:</h3>
          <ul>
            {currentAnswers.map((a, i) => (
              <li key={i}>
                Participant {a.participantId.slice(0, 8)}: {a.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
