"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import Presentations from "@/app/components/presentations";

export default function Page() {
  const params = useParams<{ presentationId: string }>();

  useEffect(() => {
    const getPresentation = () => {};
  }, []);

  return (
    <div>
      <h1>{params.presentationId}</h1>
      <Presentations />
    </div>
  );
}
