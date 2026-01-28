import { ArrowUp, Sparkles } from "lucide-react";
const Aichat = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* ATHERE: Make the element reduce with the viewport */}
      <div className="mx-4">
        <div className="flex max-w-[1500px] min-w-0 items-center rounded-lg border-2 border-gray-400">
          <div className="hidden p-4 lg:block">
            <Sparkles size={20} fill="currentColor" className="text-gray-800" />
          </div>
          <input
            placeholder="What would you like to do?"
            className="h-12 min-w-0 flex-1 font-light text-black outline-none"
          />
          <div className="p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
              <ArrowUp className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>

      <div className="bg-green-250 ml-4 flex max-w-[1050px] justify-start gap-1 sm:flex-wrap lg:max-w-[700px] xl:max-w-[900px] 2xl:max-w-[1050px]">
        <div className="flex h-8 items-center gap-2 rounded-lg bg-gray-100 px-4 text-sm font-light text-black">
          <Sparkles size={10} fill="currentColor" className="text-gray-400" />
          <span>Spark creativity with an icebreaker</span>
        </div>
        <div className="flex h-8 items-center gap-2 rounded-lg bg-gray-100 px-4 text-sm font-light text-black">
          <Sparkles size={10} fill="currentColor" className="text-gray-400" />
          <span>Engage my audience in a meeting</span>
        </div>
        <div className="flex h-8 items-center gap-2 rounded-lg bg-gray-100 px-4 text-sm font-light text-black">
          <Sparkles size={10} fill="currentColor" className="text-gray-400" />
          <span>Have fun with a competitive quiz</span>
        </div>
        <div className="flex h-8 items-center gap-2 rounded-lg bg-gray-100 px-4 text-sm font-light text-black">
          <Sparkles size={10} fill="currentColor" className="text-gray-400" />
          <span>Capture feedback in a survey</span>
        </div>
      </div>
    </div>
  );
};

export default Aichat;
