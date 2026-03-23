"use client";

import { useCurrentUser } from "@/app/components/context/authContext";
import Present from "@/app/components/present";
import { fetchCanvasSlides, fetchSlides, getEpochSeconds } from "@/lib/utils";
import { PresentationType } from "@shared/presentation";
import { SlidesState, SlideState } from "@shared/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [presentation, setPresentation] = useState<PresentationType | null>(
    null,
  );
  const { presentationId } = useParams<{ presentationId: string }>();
  const [slides, setSlides] = useState<SlidesState | null>(null);
  const [slide, setSlide] = useState<SlideState | null>(null);
  const [index, setIndex] = useState(0);
  const { token } = useCurrentUser();

  if (!token) return null;

  useEffect(() => {
    if (slides && slides[index]) {
      setSlide(slides[index]);
    }
  }, [slides, index]);

  useEffect(() => {
    const loadSlides = async () => {
      const response = await fetchSlides(token);
      const result = await response.json();

      const response_two = await fetchCanvasSlides(token);
      const result_two = await response_two.json();

      setSlides(
        [...result.data.slides, ...result_two.data.slides].sort((a, b) => {
          const timeA = getEpochSeconds(a.createdAt);
          const timeB = getEpochSeconds(b.createdAt);

          if (timeA === null) return 1;
          if (timeB === null) return -1;

          return timeA - timeB;
        }),
      );
    };

    loadSlides();
  }, []);

  const loadPresentation = async (id: string) => {
    const url = `http://localhost:8000/presentations/${id}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    setPresentation(result.data);
  };

  useEffect(() => {
    if (presentationId) {
      loadPresentation(presentationId);
    }
  }, [presentationId]);

  // VERIFY: if this is the right way to handle this
  if (!presentation) return null;

  const nextSlide = () => {
    if (slides && slides.length - 1 > index) {
      setIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (slides && index >= 0) setIndex((prev) => prev - 1);
  };

  if (!slide) return <div>No slide</div>;
  if (!slides) return <div>No slide</div>;

  return (
    <div className="flex h-screen flex-col bg-slate-100 p-4">
      <Present slide={slide} />

      <div className="mt-auto ml-12 flex w-fit gap-2 text-sm font-light">
        <button
          className="flex cursor-pointer rounded-full bg-gray-300/30 p-2"
          onClick={() => prevSlide()}
          disabled={index == 0}
        >
          <ArrowLeft size={18} strokeWidth={1.2} />
        </button>
        {slides && index < slides?.length - 1 ? (
          <button
            className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-300/30 p-2 text-[12px]"
            onClick={() => nextSlide()}
          >
            <ArrowRight size={18} strokeWidth={1.2} />
            Next Slide
          </button>
        ) : (
          <button
            className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-300/30 p-2 text-[12px]"
            onClick={() => nextSlide()}
          >
            <ArrowRight size={18} strokeWidth={1.2} />
            End presentation
          </button>
        )}
      </div>
    </div>
  );
}
