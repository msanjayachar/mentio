"use client";

import Aichat from "./aichat";
import Create from "./create";
import Features from "./features";
import Sidebar from "./sidebar";
import { useState } from "react";
import { Menudrawer } from "./menudrawer";
import Homenavbar from "./homenavbar";
import Presentations from "./presentations";

const Home = () => {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <div>
      {/* <Homenavbar /> */}
      <div className="flex">
        {/* <aside className="hidden w-72 shrink-0 lg:block"> */}
        {/*   <Sidebar */}
        {/*     isOpen={true} */}
        {/*     toggleSidebar={handleViewSidebar} */}
        {/*     page="home" */}
        {/*   /> */}
        {/* </aside> */}
        <div className="flex w-full flex-col gap-12">
          <Presentations />
          {/* TODO: Verify whether the Aichat isn't shrinking below lg because of the other elements/components here */}
          {/* <div className="w-full min-w-0"> */}
          {/*   <Create /> */}
          {/* </div> */}
          {/* <div className="hidden min-w-0 lg:block"> */}
          {/*   <Aichat /> */}
          {/* </div> */}
          {/* <div className="min-w-0"> */}
          {/*   <Features /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
