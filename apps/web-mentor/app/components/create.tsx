import { ChevronDown, Upload } from "lucide-react";

const Create = () => {
  return (
    <div className="w-full">
      <div className="bg-red-400 sm:bg-blue-300 md:bg-purple-400 lg:bg-blue-500 xl:bg-green-400 2xl:bg-pink-500">
        <span className="block sm:hidden">base</span>
        <span className="hidden sm:block md:hidden">sm</span>
        <span className="hidden md:block lg:hidden">md</span>
        <span className="hidden lg:block xl:hidden">lg</span>
        <span className="hidden xl:block 2xl:hidden">xl</span>
        <span className="3xl:hidden hidden 2xl:block">2xl</span>
        <span className="3xl:block hidden">3xl</span>
      </div>
      <h1 className="mb-12 px-4 text-4xl">Welcome!</h1>
      <div className="flex flex-col gap-4 px-4 md:flex-row">
        <button className="flex h-10 w-full items-center justify-between rounded-full border-2 border-gray-600 bg-black px-4 text-center text-sm text-white md:w-48">
          <span className="mx-auto">New Menti</span>
          <span className="flex h-full cursor-pointer items-center border-l border-gray-400 py-1 pl-1.5">
            <ChevronDown />
          </span>
        </button>
        <button className="flex h-10 w-48 items-center gap-1 rounded-full border-2 border-black bg-white px-4 text-sm text-black">
          <Upload size={16} />
          Import presentation
        </button>
      </div>
    </div>
  );
};

export default Create;
