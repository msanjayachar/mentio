"use client";

import Aichat from "./aichat";
import Create from "./create";
import Features from "./features";
import Sidebar from "./sidebar";
import { useState } from "react";
import { Menudrawer } from "./menudrawer";
import Homenavbar from "./homenavbar";

const Home = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Homenavbar />
      <div className="flex">
        <aside className="hidden w-72 shrink-0 lg:block">
          <Sidebar
            isOpen={true}
            toggleSidebar={handleViewSidebar}
            page="home"
          />
        </aside>
        <div className="flex w-full flex-col gap-12">
          {/* <Presentations /> */}
          <div className="w-full">
            <Create />
          </div>
          <div className="hidden lg:block">
            <Aichat />
          </div>
          <Features />
        </div>
      </div>
    </div>
  );
};

export default Home;
