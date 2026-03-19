"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const params = useParams<{ presentationId: string }>();

  // THREAD:
  useEffect(() => {
    const getPresentation = () => {};
  }, []);

  return <div>{params.presentationId}</div>;
}
