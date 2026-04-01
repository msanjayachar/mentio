// mentor view
"use client";

import { ArrowLeft, ChevronDown, Play, Settings, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import type { McqQuestion, McqOption } from "@shared/mcq";
import type { PresentationType } from "@shared/presentation";
import { SlidesState } from "@shared/types";
import { useCurrentUser } from "./context/authContext";

const PresentationNav = ({ slides }: { slides: SlidesState }) => {
  const [presentationTitle, setPresentationTitle] = useState<string>("");
  const router = useRouter();
  const [presentation, setPresentation] = useState<PresentationType | null>(
    null,
  );
  const { token } = useCurrentUser();
  const { presentationId } = useParams<{ presentationId: string }>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const presentationSlides = slides.filter(
    (slide) => slide.presentationId === presentationId,
  );

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

  const generateId = () => {
    const randomId = Math.floor(Math.random() * 999999);

    const stringRandomId = randomId.toString();

    return stringRandomId;
  };

  const startPresentation = async (id: string) => {
    const url = `http://localhost:8000/presentations/start/${id}`;
    const roomId = generateId();

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: presentationTitle, roomId: roomId }),
    });

    const result = await response.json();

    setPresentation(result.data);

    router.push(`/presentation/${result.data.id}`);
  };

  const updatePresentation = async (title: string) => {
    const url = `http://localhost:8000/presentations/${presentationId}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    return response;
  };

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const value = e.target.value;

    setPresentationTitle(value);

    timeoutRef.current = setTimeout(() => {
      updatePresentation(value);
    }, 300);
  };

  useEffect(() => {
    if (presentation?.title) {
      setPresentationTitle(presentation.title);
    }
  }, [presentation]);

  return (
    <div>
      <div className="flex justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <button className="cursor-pointer" onClick={() => router.push("/")}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <div>
              <input
                onChange={(e) => handleUpdate(e)}
                value={presentationTitle}
                placeholder="Untitled presentation"
                className="font-light text-black"
              />
            </div>
            <div className="flex items-center gap-1">
              <User size={15} />
              <p className="text-sm font-light text-gray-500">
                My presentations
              </p>
            </div>
          </div>
          <div className="pr-4 text-gray-400">|</div>
          <div className="rounded-full bg-gray-100 p-2">
            <Settings />
          </div>
        </div>
        <div className="flex items-center">
          <div className="hidden [@media(min-width:1000px)]:block">
            <div className="flex items-center gap-4">
              {/* TODO: Two tabs */}
              <div>Create</div>
              <div className="flex items-center gap-2">
                <span>Results</span>
                <span className="rounded-full bg-gray-300 px-2 font-light">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-fit rounded-full bg-[#5768e7] pl-4">
          <button
            onClick={() => startPresentation(presentationId)}
            className={`flex h-12 items-center justify-between ${presentationSlides.length === 0 ? "pointer-events-none cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            disabled={presentationSlides.length === 0 ? true : false}
          >
            <span className="px-2 text-white">
              <div className="sm:hidden">
                <Play fill="white" />
              </div>
              <div className="hidden text-sm sm:block">Start presentation</div>
            </span>
            <ChevronDown
              size={20}
              className="h-full w-14 rounded-r-full border-l-2 border-gray-400 px-2"
              color="white"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresentationNav;
