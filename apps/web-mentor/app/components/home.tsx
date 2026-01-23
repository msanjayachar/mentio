"use client";

import Aichat from "./aichat";
import Create from "./create";
import Features from "./features";
import Sidebar from "./sidebar";
import { useState } from "react";
import { Menudrawer } from "./menudrawer";

const Home = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <div>
      <Menudrawer />
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
        <div className="flex w-full flex-col gap-12">
          {/* <Presentations /> */}
          <Create />
          <Aichat />
          <Features />
        </div>
      </div>
    </div>
  );
};

export default Home;
