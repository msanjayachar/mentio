import { ArrowUp, Sparkles } from "lucide-react";

const Aichat = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="mx-4 flex max-w-[900px] items-center rounded-lg border-2 border-gray-400 bg-gray-50 lg:max-w-[1550px]">
        <div className="hidden p-4 lg:block">
          <Sparkles size={20} fill="currentColor" className="text-gray-800" />
        </div>
        <input
          placeholder="What would you like to do?"
          className="h-12 w-full font-light text-black outline-none"
        />
        <div className="p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
            <ArrowUp className="h-5 w-5" />
          </span>
        </div>
      </div>

      <div className="bg-green-250 ml-4 flex flex-wrap justify-start gap-1 xl:max-w-[1100px]">
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
