"use client";

import Participants from "@/app/components/participants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { socket } from "@shared/socket";
import { useCurrentUser } from "@/app/components/context/authContext";

const page = () => {
  const { presentationId } = useParams<{ presentationId: string }>();
  const [participants, setParticipants] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const { token } = useCurrentUser();

  useEffect(() => {
    if (!token) return;

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
    const handleParticipants = (participants: any) => {
      setParticipants(participants);
    };

    socket.on("participants", handleParticipants);

    return () => {
      socket.off("participants", handleParticipants);
    };
  }, []);

  useEffect(() => {
    // connection happens at import time.
    if (!roomId) return;

    if (socket.connected) {
      socket.emit("join-room", roomId);
    }

    const onConnect = () => {
      socket.emit("join-room", roomId);
    };

    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
    };
  }, [roomId]);

  return (
    <div>
      <h1 className="w-full bg-red-100 text-center text-3xl font-thin text-red-300">
        RoomID: {roomId}
      </h1>

      <Participants
        presentationId={presentationId}
        participants={participants}
      />
    </div>
  );
};

export default page;
