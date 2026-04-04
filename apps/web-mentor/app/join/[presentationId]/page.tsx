"use client";

import Participants from "@/app/components/participants";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getChannel } from "@shared/channel";
import type { AppEvent } from "@shared/events";
import { useCurrentUser } from "@/app/components/context/authContext";

const page = () => {
  const { presentationId } = useParams<{ presentationId: string }>();
  const router = useRouter();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [participants, setParticipants] = useState<
    { id: string; name: string }[]
  >([]);
  const { token } = useCurrentUser();

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

  useEffect(() => {
    if (!roomId) return;

    const channel = getChannel();
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
  }, [roomId]);

  const handleStart = () => {
    router.push(`/presentation/${presentationId}`);
  };

  return (
    <div>
      <h1 className="w-full bg-red-100 text-center text-3xl font-thin text-red-300">
        RoomID: {roomId}
      </h1>

      <Participants
        presentationId={presentationId}
        participants={participants}
      />

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleStart}
          className="rounded bg-blue-500 px-6 py-3 text-white hover:bg-blue-600"
        >
          Start Presentation
        </button>
      </div>
    </div>
  );
};

export default page;
