import { FilePlus, Home, Inbox, User, Users } from "lucide-react";

const Sidebar = ({
  isOpen,
  toggleSidebar,
  page,
}: {
  isOpen: boolean;
  toggleSidebar?: () => void;
  page: string;
}) => {
  const sidebarClass = isOpen ? "sidebar open" : "sidebar";

  return (
    <div
      className={`mt-5 flex h-[calc(100vh-80px)] flex-col justify-start gap-16 p-8 text-sm font-light ${sidebarClass}`}
    >
      <div className="flex flex-col gap-4">
        <span className="flex cursor-pointer items-center gap-2">
          <Home size={20} />
          Home
        </span>
        <span className="flex cursor-pointer items-center gap-2">
          <User size={20} />
          My Presentations
        </span>
        <span className="flex cursor-pointer items-center gap-2">
          <Inbox size={20} />
          Shared with me
        </span>
      </div>
      <div className="flex flex-col gap-4">
        <span className="text-sm text-gray-400">Workspace</span>
        <span className="flex cursor-pointer items-center gap-2">
          <Users size={20} /> Workspace presentations
        </span>
        <span className="flex cursor-pointer items-center gap-2">
          <FilePlus size={20} />
          Shared templates
        </span>
      </div>
      {page !== "home" && (
        <button
          onClick={toggleSidebar}
          className="sidebar-toggle cursor-pointer bg-red-200"
        >
          Toggle Sidebar
        </button>
      )}
    </div>
  );
};

export default Sidebar;
