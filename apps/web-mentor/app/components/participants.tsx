"use client";

import { useRouter } from "next/navigation";

const Participants = ({
  participants,
  presentationId,
}: {
  participants: string[];
  presentationId: string;
}) => {
  const router = useRouter();

  const dummy = ["u1", "u2", "u3", "u4", "u5", "u6", "u7"];

  const data = participants.length ? participants : dummy;

  return (
    <div>
      {data.map((participant) => (
        <div>{participant}</div>
      ))}

      <button
        className="h-12 w-48 cursor-pointer rounded-md bg-blue-300"
        onClick={() => router.push(`/presentation/${presentationId}`)}
      >
        Start
      </button>
    </div>
  );
};

export default Participants;
