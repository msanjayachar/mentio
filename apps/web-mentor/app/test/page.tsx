import { ArrowUp, Sparkles } from "lucide-react";

export default function Page() {
  return (
    <div>
      <div className="bg-red-400 sm:bg-blue-300 md:bg-purple-400 lg:bg-blue-500 xl:bg-green-400 2xl:bg-pink-500">
        <span className="block sm:hidden">base</span>
        <span className="hidden sm:block md:hidden">sm</span>
        <span className="hidden md:block lg:hidden">md</span>
        <span className="hidden lg:block xl:hidden">lg</span>
        <span className="hidden xl:block 2xl:hidden">xl</span>
        <span className="3xl:hidden hidden 2xl:block">2xl</span>
        <span className="3xl:block hidden">3xl</span>
      </div>

      <div className="mx-4">
        <div className="w-auto bg-blue-400">
          <div className="ml-4 flex max-w-[1500px] min-w-0 items-center rounded-lg border-2 border-gray-400">
            <div className="hidden p-4 lg:block">
              <Sparkles
                size={20}
                fill="currentColor"
                className="text-gray-800"
              />
            </div>
            <input
              placeholder="What would you like to do?"
              className="h-12 min-w-0 flex-1 bg-red-400 font-light text-black outline-none"
            />
            <div className="p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                <ArrowUp className="h-5 w-5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
