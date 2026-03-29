"use client";

import { socket } from "@shared/socket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [participants, setParticipants] = useState([]);
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("get-participants", roomId);
    });

    if (socket.connected) {
      socket.emit("get-participants", roomId);
    }

    socket.on("participants", (participants) => {
      setParticipants(participants);
    });
  }, []);

  return (
    <div className="h-screen w-full bg-white">
      <p className="text-4xl text-red-500">attend</p>
      <div>
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
