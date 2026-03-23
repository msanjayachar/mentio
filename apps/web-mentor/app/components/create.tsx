"use client";

import { ChevronDown, Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "./context/authContext";

const Create = () => {
  const router = useRouter();
  const { token } = useCurrentUser();

  const createPresentation = async (title: string) => {
    const url = "http://localhost:8000/presentations";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const result = await response.json();

    router.push(`/create/${result.data.id}`);
  };

  return (
    <div className="w-full">
      <h1 className="mb-12 px-4 text-4xl">Welcome!</h1>
      <div className="flex flex-col gap-4 px-4 sm:flex-row">
        <button
          className="flex h-10 w-full items-center justify-between rounded-full border-2 border-gray-600 bg-black px-4 text-center text-sm text-white sm:w-44"
          onClick={() => createPresentation("Untitled presentation")}
        >
          <Link href={"/create"} className="mx-auto">
            New Menti
          </Link>
          <span className="flex h-full cursor-pointer items-center border-l border-gray-400 py-1 pl-1.5">
            <ChevronDown />
          </span>
        </button>
        <button className="flex h-10 w-48 cursor-pointer items-center gap-1 rounded-full border-2 border-black bg-white px-4 text-sm text-black">
          <Upload size={16} />
          Import presentation
        </button>
      </div>
    </div>
  );
};

export default Create;
