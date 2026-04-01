// mentor view
"use client";

import { useCurrentUser } from "@/app/components/context/authContext";
import Present from "@/app/components/present";
import { fetchCanvasSlides, fetchSlides, getEpochSeconds } from "@/lib/utils";
import { CanvasesApiResponseSchema } from "@shared/api/canvas";
import { McqsApiResponseSchema } from "@shared/api/mcq";
import { PresentationType } from "@shared/presentation";
import { socket } from "@shared/socket";
import { ERROR_MESSAGES, SlidesState, SlideState } from "@shared/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// STARTER_TASK: slide is here send it all the other in the room.
export default function Page() {
  const [presentation, setPresentation] = useState<PresentationType | null>(
    null,
  );
  const { presentationId } = useParams<{ presentationId: string }>();
  const [slides, setSlides] = useState<SlidesState | null>(null);
  const [slide, setSlide] = useState<SlideState | null>(null);
  const [index, setIndex] = useState(0);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [participants, setParticipants] = useState(null);
  const { token } = useCurrentUser();

  if (!token) return null;

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const presentationSlides = slides?.filter(
      (slide) => slide.presentationId === presentationId,
    );

    if (presentationSlides && presentationSlides[index]) {
      setSlide(presentationSlides[index]);
    }
  }, [slides, index]);

  useEffect(() => {
    // connection happens at import time.
    if (socket.connected) {
      socket.emit("create-room", roomId);
    }

    // AT_HERE: persisting room id
    socket.on("room-created", (roomId) => {
      console.log("room created: ", roomId);

      // NEXT: 1. Persist this room id
      setRoomId(roomId);
      socket.emit("join-room", roomId);
    });

    socket.on("joined-room", (roomId) => {
      console.log("joined room: ", roomId);

      socket.emit("get-participants", roomId);
    });

    socket.on("participants", (participants) => {
      setParticipants(participants);

      // NEXT: 2. mentee joining should update the list of participants immediately.
      // NEXT: 3. Send slide to everyone in the room except the SENDER.
    });

    const loadSlides = async () => {
      const response_mcq = await fetchSlides(token);
      const result_mcq = await response_mcq.json();

      // TODO: API Response Schema parse
      const response_canvas = await fetchCanvasSlides(token);
      const result_canvas = await response_canvas.json();

      const parsed_mcq = McqsApiResponseSchema.safeParse(result_mcq);
      const parsed_canvas = CanvasesApiResponseSchema.safeParse(result_canvas);

      if (!parsed_mcq.success || !parsed_canvas.success) {
        toast.error("Unexpected server response four", {
          position: "top-center",
          style: {
            background: "red",
            color: "white",
          },
        });

        return;
      }

      const res_mcq = parsed_mcq.data;
      const res_canvas = parsed_canvas.data;

      if (res_mcq.success && res_canvas.success) {
        setSlides([...res_mcq.data, ...res_canvas.data]);

        toast.success("Mcq Slide", {
          position: "top-center",
          style: {
            background: "green",
            color: "white",
          },
        });
      } else {
        if (res_mcq.error) {
          toast.error(ERROR_MESSAGES[res_mcq.error] ?? "Unexpected error", {
            position: "top-center",
            style: {
              background: "red",
              color: "white",
            },
          });
        }

        if (res_canvas.error) {
          toast.error(ERROR_MESSAGES[res_canvas.error] ?? "Unexpected error", {
            position: "top-center",
            style: {
              background: "red",
              color: "white",
            },
          });
        }
      }
    };

    loadSlides();
  }, []);

  const loadPresentation = async (id: string) => {
    const url = `http://localhost:8000/presentations/${id}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    setPresentation(result.data);
  };

  useEffect(() => {
    if (presentationId) {
      loadPresentation(presentationId);
    }
  }, [presentationId]);

  // VERIFY: if this is the right way to handle this
  if (!presentation) return null;

  const nextSlide = () => {
    if (slides && slides.length - 1 > index) {
      setIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (slides && index >= 0) setIndex((prev) => prev - 1);
  };

  if (!slide) return <div>No slide</div>;
  if (!slides) return <div>No slide</div>;

  return (
    <div className="flex h-screen flex-col bg-slate-100 p-4">
      <Present slide={slide} roomId={roomId} />

      {/* FOOTER */}
      <div className="mt-auto ml-12 flex w-fit gap-2 text-sm font-light">
        <button
          className="flex cursor-pointer rounded-full bg-gray-300/30 p-2"
          onClick={() => prevSlide()}
          disabled={index == 0}
        >
          <ArrowLeft size={18} strokeWidth={1.2} />
        </button>
        {slides && index < slides?.length - 1 ? (
          <button
            className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-300/30 p-2 text-[12px]"
            onClick={() => nextSlide()}
          >
            <ArrowRight size={18} strokeWidth={1.2} />
            Next Slide
          </button>
        ) : (
          <button
            className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-300/30 p-2 text-[12px]"
            onClick={() => nextSlide()}
          >
            <ArrowRight size={18} strokeWidth={1.2} />
            End presentation
          </button>
        )}
      </div>
    </div>
  );
}
