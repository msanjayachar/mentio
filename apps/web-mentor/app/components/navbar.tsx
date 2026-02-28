"use client";

import { useCurrentUser } from "./context/authContext";
import { useRouter } from "next/navigation";
import Logo from "./logo";

const Navbar = () => {
  const { currentUser } = useCurrentUser();
  const router = useRouter();

  return (
    <div className="flex h-20 w-full items-center justify-between bg-gray-500 px-72">
      <div className="flex cursor-pointer items-center">
        <Logo />
        <h1 className="text-3xl">Mentio</h1>
      </div>
      <div className="flex gap-8">
        {currentUser ? (
          <button className="h-12 w-32 cursor-pointer rounded-full bg-red-400">
            Go to home
          </button>
        ) : (
          <div className="flex gap-2 text-xl">
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
