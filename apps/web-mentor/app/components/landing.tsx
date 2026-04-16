"use client";

import { useRouter } from "next/navigation";
import Navbar from "./navbar";

const Landing = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full px-4 md:px-8 lg:px-16">
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="mt-8 flex scale-y-180 flex-col items-center text-center text-3xl leading-normal font-bold md:mt-16 md:text-4xl lg:mt-32 lg:text-7xl lg:leading-[1.125]">
          <span className="[word-spacing:0.8rem]">
            LISTEN, LEARN, AND THINK.
          </span>
          <span className="[word-spacing:0.8rem]">TOGETHER.</span>
        </h1>
        <p className="mt-8 flex w-full max-w-2xl flex-col items-center text-center leading-normal font-light text-white md:mt-12 lg:mt-24 lg:text-lg lg:leading-8">
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
      <div className="mt-12 flex w-full items-center justify-center md:mt-16 lg:mt-28">
        <button
          className="h-12 w-full max-w-xs cursor-pointer rounded-full bg-red-400 px-6 py-3 text-base md:h-14 md:text-lg"
          onClick={() => router.push("/login")}
        >
          Get started for free
        </button>
      </div>
    </div>
  );
};

export default Landing;
