"use client";

import { Bell, Search } from "lucide-react";
import { Menudrawer } from "./menudrawer";
import Logo from "./logo";
import Profile from "./user";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "./context/authContext";

const Homenavbar = () => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();

  return (
    <div className="flex justify-between">
      <div className="flex w-86 items-center justify-start pl-6">
        <Logo />
      </div>

      <div className="flex w-full items-center justify-between py-6 pr-12">
        <div className="hidden lg:block">
          <div className="flex h-10 w-120 items-center gap-2 rounded-sm bg-[#F2F1F0] px-4">
            <Search size={18} strokeWidth={1.5} />
            <input
              placeholder="Search presentations, folders, and pages "
              className="w-full text-sm font-light outline-none"
            />
          </div>
          <p className="text-5xl text-red-300">
            {currentUser ? currentUser.name : "No user name"}
          </p>
        </div>

        <div className="hidden lg:block">
          <div className="flex cursor-pointer items-center gap-4">
            {currentUser && (
              <div className="rounded-full border bg-gray-100 p-2">
                <Bell size={18} strokeWidth={2} />
              </div>
            )}

            {currentUser ? (
              <Profile />
            ) : (
              <div className="flex gap-2">
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

        <div className="flex w-full lg:hidden">
          <div className="ml-auto">
            <Menudrawer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homenavbar;
