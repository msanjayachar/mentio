"use client";

import { useRouter } from "next/navigation";
import Navbar from "./navbar";

const Landing = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="mt-32 flex scale-y-180 flex-col items-center text-7xl leading-18 font-bold [word-spacing:0.8rem]">
          <span>LISTEN, LEARN, AND THINK.</span>
          <span>TOGETHER.</span>
        </h1>
        <p className="mt-24 flex w-fit flex-col items-center text-lg leading-8 font-light text-white">
          <span className="">
            Get everyone participating in meetings, classes, or trainings. With
            tools built for
          </span>
          <span className="">
            interaction and enhanced by AI, you&apos;ll spark engagement and
            turn live insights into action.
          </span>
        </p>
      </div>
      <div className="mt-28 flex w-full items-center justify-center">
        <button
          className="h-14 w-fit cursor-pointer rounded-full bg-red-400 px-4"
          onClick={() => router.push("/login")}
        >
          Get started for free
        </button>
      </div>
    </div>
  );
};

export default Landing;
