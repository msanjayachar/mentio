"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "./context/authContext";
import { PresentationType } from "@shared/mcq";
import { formatTime } from "@/lib/utils";
import Link from "next/link";

const PresentationsList = () => {
  const { token } = useCurrentUser();
  const [presentations, setPresentations] = useState<PresentationType[] | null>(
    null,
  );

  const getPresentations = async () => {
    const url = "http://localhost:8000/presentations";

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    setPresentations(result.data);
  };

  useEffect(() => {
    getPresentations();
  }, []);

  if (!presentations) return null;

  return (
    <div className="bg-red-500">
      <h1>PresentationsList Component</h1>

      {presentations.map((presentation) => (
        <div key={presentation.id}>
          <Link href={`/create/${presentation.id}`}>
            <h1>{presentation.title}</h1>
          </Link>
          <h2>{formatTime(presentation.createdAt)}</h2>
        </div>
      ))}
    </div>
  );
};

export default PresentationsList;
