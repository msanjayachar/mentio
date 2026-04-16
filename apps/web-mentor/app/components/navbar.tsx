"use client";

import { useCurrentUser } from "./context/authContext";
import { useRouter } from "next/navigation";
import Logo from "./logo";

const Navbar = () => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  return (
    <div className="flex h-auto w-full flex-col items-center justify-between bg-gray-500 px-4 py-3 md:flex-row md:px-8 lg:px-16 xl:px-72">
      <div className="flex cursor-pointer items-center">
        <Logo />
        <h1 className="text-xl md:text-2xl lg:text-3xl">Mentio</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
        {currentUser ? (
          <button className="h-10 w-28 cursor-pointer rounded-full bg-red-400 px-4 text-sm md:h-12 md:w-32 md:text-base">
            Go to home
          </button>
        ) : (
          <div className="flex gap-3 text-base md:gap-4 md:text-xl">
            <button
              className="cursor-pointer underline"
              onClick={() => router.push("/signup")}
            >
              Signup
            </button>
            <button
              className="cursor-pointer underline"
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
