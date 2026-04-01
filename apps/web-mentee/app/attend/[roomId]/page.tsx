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
  }, []);

  useEffect(() => {
    if (roomId) {
      socket.on("connect", () => {
        socket.emit("join-room", roomId);
      });

      if (socket.connected) {
        socket.emit("join-room", roomId);
      }

      socket.on("joined-room", (roomId) => {
        socket.emit("get-current-slide", roomId);
        socket.emit("get-participants", roomId);
      });

      socket.on("participants", (participants) => {
        setParticipants(participants);
      });
    }
  }, [roomId]);

  return (
    <div className="h-screen w-full bg-white">
      <div className="w-full bg-red-50 py-4 text-center">
        <p className="text-3xl font-thin text-red-500">{roomId}</p>
      </div>

      <Present slide={slide!} roomId={roomId} />
    </div>
  );
};

export default page;
