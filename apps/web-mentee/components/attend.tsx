// mentee view
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { socket } from "@shared/socket";
import { Presentation } from "@shared/types";

export default function Attend() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [joined, setJoined] = useState<boolean>(false);
  const router = useRouter();
  const [participants, setParticipants] = useState([]);

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const joinRoom = async () => {
    if (!socket) return;

    socket.emit("join-room", roomId);
    setJoined(true);
  };

  useEffect(() => {
    socket.on("participants", (participants) => {
      setParticipants(participants);
    });
  }, [roomId]);

  useEffect(() => {
    if (joined) {
      router.push(`/attend/${roomId}`);
      toast.success("Joined Presentation", {
        position: "top-center",
        style: {
          background: "green",
          color: "white",
        },
      });
    }
  }, [joined]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-gray-500 p-4">
      <div className="absolute top-1/2 -translate-y-1/2">
        <div className="flex w-full max-w-84 flex-col items-center gap-2">
          <h1 className="text-2xl md:text-3xl">Mentio</h1>
          <h2 className="text-xl md:text-2xl">Enter the code to join</h2>
          <p className="mb-4 text-sm text-gray-300 md:mb-8 md:text-base">
            It&apos;s on the screen in front of you
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-6 md:gap-8">
          <input
            onChange={(e) => handleUpdate(e)}
            placeholder="1234 5678"
            className="h-14 w-full max-w-xs rounded-xl border-2 border-transparent bg-gray-200 px-4 text-center text-lg text-black ring-4 ring-transparent ring-offset-4 ring-offset-gray-500 duration-75 outline-none hover:border-blue-400 focus:border-blue-400 focus:ring-blue-200 md:h-16"
          />
          <button
            className="h-12 w-32 cursor-pointer rounded-full bg-red-400 px-6"
            onClick={() => joinRoom()}
          >
            Join
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 mb-8 text-center text-sm md:text-base">
        Create your own Presentation at{" "}
        <Link className="bg-gray-500 underline" target="_blank" href="/mentor">
          mentio.com
        </Link>
      </div>
    </div>
  );
}
