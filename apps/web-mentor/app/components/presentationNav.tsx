"use client";

import { ArrowLeft, ChevronDown, Play, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PresentationNav = () => {
  const [presentationTitle, setPresentationTitle] = useState<string | null>(
    null,
  );
  const router = useRouter();

  // TODO: Submit to the backend
  const submitTitle = () => {
    console.log("presentationTitle: ", presentationTitle);
  };

  useEffect(() => {
    console.log("presentationTitle: ", presentationTitle);
  }, [presentationTitle]);

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
                onChange={(e) => setPresentationTitle(e.target.value)}
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
          <button className="flex h-12 items-center justify-between">
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
