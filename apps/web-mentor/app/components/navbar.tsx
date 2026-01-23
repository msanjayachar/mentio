"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    console.log("theme: ", theme);
  }, [theme]);

  return (
    <div className="flex h-20 w-full items-center justify-between bg-gray-500 px-72">
      <div>
        <h1 className="cursor-pointer text-3xl">Mentio</h1>
      </div>
      <div className="flex gap-8">
        <button className="h-12 w-32 cursor-pointer rounded-full bg-red-400">
          Go to home
        </button>
        {/* <div className="flex items-center"> */}
        {/*   <div className="flex h-12 w-fit gap-2 rounded-full bg-gray-600 p-2"> */}
        {/*     <div className="flex"> */}
        {/*       <button */}
        {/*         className={`${theme === "dark" && "bg-blue-200"} cursor-pointer rounded-full duration-300`} */}
        {/*         onClick={() => setTheme("dark")} */}
        {/*       > */}
        {/*         <Moon */}
        {/*           size={25} */}
        {/*           className="w-12 rounded-l-lg text-black" */}
        {/*           strokeWidth={1.5} */}
        {/*         /> */}
        {/*       </button> */}
        {/*       <button */}
        {/*         className={`${theme === "light" && "bg-amber-200"} cursor-pointer rounded-full duration-300`} */}
        {/*         onClick={() => setTheme("light")} */}
        {/*       > */}
        {/*         <Sun */}
        {/*           size={25} */}
        {/*           className="w-12 rounded-r-lg text-black" */}
        {/*           strokeWidth={1.5} */}
        {/*         /> */}
        {/*       </button> */}
        {/*     </div> */}
        {/*   </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Navbar;
