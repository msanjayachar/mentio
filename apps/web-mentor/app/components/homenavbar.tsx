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
    <div className="flex w-full items-center justify-between bg-gray-500 px-4 py-3 md:px-6 lg:px-12">
      <div className="flex items-center justify-start">
        <Logo />
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:block">
          <div className="flex h-10 w-64 items-center gap-2 rounded-sm bg-[#F2F1F0] px-4 xl:w-120">
            <Search size={18} strokeWidth={1.5} />
            <input
              placeholder="Search presentations, folders, and pages "
              className="w-full text-sm font-light outline-none"
            />
          </div>
        </div>

        <div className="hidden cursor-pointer items-center gap-4 lg:flex">
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

        <div className="flex lg:hidden">
          <Menudrawer />
        </div>
      </div>
    </div>
  );
};

export default Homenavbar;
