"use client";

import Participants from "@/app/components/participants";
import { useParams } from "next/navigation";

const page = () => {
  const { presentationId } = useParams<{ presentationId: string }>();

  return (
    <div>
      <Participants presentationId={presentationId} participants={[]} />
    </div>
  );
};

export default page;
