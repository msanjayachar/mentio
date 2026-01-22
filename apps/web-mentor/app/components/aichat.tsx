import { ArrowUp, Sparkles } from "lucide-react";

const Aichat = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="mx-4 flex w-400 items-center rounded-lg border-2 border-gray-400 bg-gray-50">
        <div className="p-4">
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
      <div className="bg-green-250 ml-4 flex w-260 justify-between">
        <div className="flex h-8 items-center gap-2 rounded-md bg-gray-200 px-4 text-sm font-light text-black">
          <Sparkles size={10} fill="currentColor" className="text-gray-400" />
          <span>Spark creativity with an icebreaker</span>
        </div>
        <div className="flex h-8 items-center gap-2 rounded-md bg-gray-200 px-4 text-sm font-light text-black">
          <Sparkles size={10} fill="currentColor" className="text-gray-400" />
          <span>Engage my audience in a meeting</span>
        </div>
        <div className="flex h-8 items-center gap-2 rounded-md bg-gray-200 px-4 text-sm font-light text-black">
          <Sparkles size={10} fill="currentColor" className="text-gray-400" />
          <span>Have fun with a competitive quiz</span>
        </div>
        <div className="flex h-8 items-center gap-2 rounded-md bg-gray-200 px-4 text-sm font-light text-black">
          <Sparkles size={10} fill="currentColor" className="text-gray-400" />
          <span>Capture feedback in a survey</span>
        </div>
      </div>
    </div>
  );
};

export default Aichat;
