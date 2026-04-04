// mentee view
"use client";

import { socket } from "@shared/socket";
import { SlideState } from "@shared/types";
import { getChannel } from "@shared/channel";
import type { AppEvent } from "@shared/events";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Present from "@ui/Present";

const page = () => {
  const [slide, setSlide] = useState<SlideState | null>(null);
  const [isPresenting, setIsPresenting] = useState(false);
  const { roomId } = useParams<{ roomId: string }>();
  const channel = getChannel();

  useEffect(() => {
    if (!roomId) return;

    const handleReceive = (receivedSlide: any) => {
      setSlide(receivedSlide);
      setIsPresenting(true);
    };

    socket.on("receive-slide", handleReceive);

    channel.join(roomId);

    return () => {
      socket.off("receive-slide", handleReceive);
      channel.leave();
    };
  }, [roomId, channel]);

  return (
    <div className="flex h-screen w-full flex-col bg-slate-100 text-black">
      <div className="w-full bg-red-50 py-4 text-center">
        <p className="text-3xl font-thin text-red-500">{roomId}</p>
      </div>

      {isPresenting && slide ? (
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
