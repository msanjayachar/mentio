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

  const data = participants;

  return (
    <div className="flex flex-col items-center justify-center">
      <ol className="flex w-full flex-col items-center justify-center py-10 text-center">
        {data.map((participant) => (
          <li className="text-2xl font-light text-blue-500" key={participant}>
            {participant}
          </li>
        ))}
      </ol>

      <button
        className="h-12 w-48 cursor-pointer rounded-md border border-black bg-blue-300"
        onClick={() => router.push(`/presentation/${presentationId}`)}
      >
        Start
      </button>
    </div>
  );
};

export default Participants;
