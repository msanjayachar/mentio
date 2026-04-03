// mentee view
"use client";

import { socket } from "@shared/socket";
import { SlideState } from "@shared/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Present from "@ui/Present";

const page = () => {
  // TODO: Use participants for animating the other mentee responses
  const [participants, setParticipants] = useState([]);
  const [slide, setSlide] = useState<SlideState | null>(null);
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    const handleReceive = (slide: any) => {
      setSlide(slide);
    };

    socket.on("receive-slide", handleReceive);

    return () => {
      socket.off("receive-slide", handleReceive);
    };
  }, []);

  useEffect(() => {
    if (!roomId) return;

    const join = () => {
      socket.emit("join-room", roomId);
      socket.emit("get-current-slide", roomId);
    };

    if (socket.connected) {
      join();
    }

    socket.on("connect", join);

    return () => {
      socket.off("connect", join);
    };
  }, [roomId]);

  useEffect(() => {
    const handleParticipants = (participants: any) => {
      setParticipants(participants);
    };

    socket.on("participants", handleParticipants);

    return () => {
      socket.off("participants", handleParticipants);
    };
  }, []);

  return (
    <div className="flex h-screen w-full flex-col bg-slate-100 text-black">
      <div className="w-full bg-red-50 py-4 text-center">
        <p className="text-3xl font-thin text-red-500">{roomId}</p>
      </div>

      {slide ? (
        <div>
          <Present slide={slide} roomId={roomId} />
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
