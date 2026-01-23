import { FilePlus, Home, Inbox, User, Users } from "lucide-react";

const Sidebar = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const sidebarClass = isOpen ? "sidebar open" : "sidebar";

  return (
    <div
      className={`flex h-[calc(100vh-80px)] w-72 flex-col justify-start gap-16 bg-red-400 p-8 text-sm ${sidebarClass}`}
    >
      <div className="flex flex-col gap-4">
        <span className="flex items-center gap-2">
          <Home size={20} />
          Home
        </span>
        <span className="flex items-center gap-2">
          <User size={20} />
          My Presentations
        </span>
        <span className="flex items-center gap-2">
          <Inbox size={20} />
          Shared with me
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-sm text-gray-400">Workspace</span>
        <span className="flex items-center gap-2">
          <Users size={20} /> Workspace presentations
        </span>
        <span className="flex items-center gap-2">
          <FilePlus size={20} />
          Shared templates
        </span>
      </div>
      <button
        onClick={toggleSidebar}
        className="sidebar-toggle cursor-pointer bg-red-200"
      >
        Toggle Sidebar
      </button>
    </div>
  );
};

export default Sidebar;
