import { ArrowLeft, ChevronDown, Play, Settings, User } from "lucide-react";

const PresentationNav = () => {
  return (
    <div>
      {/* <div className="sm:bg-blue-300 md:bg-purple-400 lg:bg-blue-500 xl:bg-green-400 2xl:bg-pink-500"> */}
      {/*   <span className="block bg-red-400 sm:hidden">base</span> */}
      {/*   <span className="hidden sm:block md:hidden">sm</span> */}
      {/*   <span className="hidden md:block lg:hidden">md</span> */}
      {/*   <span className="hidden lg:block xl:hidden">lg</span> */}
      {/*   <span className="hidden xl:block 2xl:hidden">xl</span> */}
      {/*   <span className="3xl:hidden hidden 2xl:block">2xl</span> */}
      {/*   <span className="3xl:block hidden">3xl</span> */}
      {/* </div> */}

      <div className="flex justify-between px-4 py-2">
        <div className="flex items-center gap-4">
          <div>
            <ArrowLeft size={20} />
          </div>
          <div>
            <div>
              <input
                placeholder="Untitled presentation"
                className="font-light text-black"
              />
            </div>
            <div className="flex items-center gap-1">
              <User size={15} />
              <p className="text-sm font-light text-gray-500">
                My presentations
              </p>
            </div>
          </div>
          <div className="pr-4 text-gray-400">|</div>
          <div className="rounded-full bg-gray-100 p-2">
            <Settings />
          </div>
        </div>
        <div className="flex items-center">
          <div className="hidden [@media(min-width:1000px)]:block">
            <div className="flex items-center gap-4">
              {/* TODO: Two tabs */}
              <div>Create</div>
              <div className="flex items-center gap-2">
                <span>Results</span>
                <span className="rounded-full bg-gray-300 px-2 font-light">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-fit rounded-full bg-[#5768e7] pl-4">
          <button className="flex h-12 items-center justify-between">
            <span className="px-2 text-white">
              <div className="sm:hidden">
                <Play fill="white" />
              </div>
              <div className="hidden text-sm sm:block">Start presentation</div>
            </span>
            <ChevronDown
              size={20}
              className="h-full w-14 rounded-r-full border-l-2 border-gray-400 px-2"
              color="white"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresentationNav;
