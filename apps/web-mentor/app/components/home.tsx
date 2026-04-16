"use client";

import Aichat from "./aichat";
import Create from "./create";
import Features from "./features";
import Sidebar from "./sidebar";
import { useState } from "react";
import Homenavbar from "./homenavbar";
import PresentationsList from "./presentationsList";
import Link from "next/link";

const Home = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Homenavbar />
      <div className="flex flex-1 flex-col lg:flex-row">
        <aside className="hidden w-72 shrink-0 lg:block">
          <Sidebar
            isOpen={true}
            toggleSidebar={handleViewSidebar}
            page="home"
          />
        </aside>

        <main className="flex w-full flex-col gap-8 p-4 md:gap-12 md:p-6 lg:p-8">
          <div className="w-full min-w-0">
            <Create />
          </div>
          <div className="hidden min-w-0 lg:block">
            <Aichat />
          </div>

          <PresentationsList limit={1} />

          <div className="min-w-0">
            <Features />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
