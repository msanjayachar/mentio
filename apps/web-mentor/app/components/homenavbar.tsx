import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menudrawer } from "./menudrawer";
import Logo from "./logo";

const Homenavbar = () => {
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
        </div>

        <div className="hidden lg:block">
          <div className="flex items-center gap-4">
            <div className="rounded-full border bg-gray-100 p-2">
              <Bell size={18} strokeWidth={2} />
            </div>
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="grayscale"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
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
