// mentee view
"use client";

import { socket } from "@shared/socket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [participants, setParticipants] = useState([]);
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    if (roomId) {
      socket.on("connect", () => {
        socket.emit("join-room", roomId);
      });

      if (socket.connected) {
        socket.emit("join-room", roomId);
      }

      socket.on("joined-room", (roomId) => {
        socket.emit("get-participants", roomId);
      });

      socket.on("participants", (participants) => {
        setParticipants(participants);
      });
    }
  }, [roomId]);

  return (
    <div className="h-screen w-full bg-white">
      <h1 className="text-4xl text-red-500">attend</h1>
      <h2 className="text-4xl text-red-500">{socket.id}</h2>

      <div>
        <h3 className="text-3xl text-red-300">List of participants: </h3>
        {participants.length > 0 &&
          participants.map((participant) => (
            <p key={participant} className="text-4xl text-blue-500">
              {participant}
            </p>
          ))}
      </div>
      <div>
        <p className="text-3xl font-thin text-red-500">{roomId}</p>
      </div>
    </div>
  );
};

export default page;
