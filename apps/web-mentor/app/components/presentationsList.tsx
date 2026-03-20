"use client";

import { useEffect, useState } from "react";
import { useCurrentUser } from "./context/authContext";
import { PresentationType } from "@shared/mcq";
import { formatTime } from "@/lib/utils";
import Link from "next/link";

const PresentationsList = ({ limit }: { limit?: number }) => {
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
    if (!token) return;

    getPresentations();
  }, [token]);

  if (!presentations) return null;

  const items = limit ? presentations.slice(0, limit) : presentations;

  return (
    <div className="bg-slate-50 px-6 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-800">
        Presentations
      </h1>

      <div className="space-y-4">
        {items.map((presentation) => (
          <div
            key={presentation.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition hover:shadow-md"
          >
            <div>
              <Link href={`/create/${presentation.id}`}>
                <h2 className="cursor-pointer text-lg font-medium text-slate-800 hover:underline">
                  {presentation.title || "Untitled presentation"}
                </h2>
              </Link>
              <p className="text-sm text-slate-500">
                {formatTime(presentation.createdAt)}
              </p>
            </div>

            <Link href={`/presentation/${presentation.id}`}>
              <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white transition hover:bg-slate-700">
                View
              </button>
            </Link>
          </div>
        ))}
      </div>

      <Link
        href={"/presentations"}
        className="block h-8 w-full cursor-pointer items-center py-4 text-center"
      >
        View all
      </Link>
    </div>
  );
};

export default PresentationsList;
