import { ChevronDown, Upload } from "lucide-react";

const Create = () => {
  return (
    <div>
      <h1 className="mb-12 text-4xl">Welcome!</h1>
      <div className="flex gap-4">
        <button className="flex h-10 w-36 items-center justify-between rounded-full border-2 border-gray-600 bg-gray-600 px-4 text-sm text-white">
          <span>New Menti</span>
          <span className="flex h-full cursor-pointer items-center border-l border-gray-400 py-1 pl-1.5">
            <ChevronDown />
          </span>
        </button>
        <button className="flex h-10 w-fit items-center gap-1 rounded-full bg-white px-4 text-sm text-black">
          <Upload size={16} />
          Import presentation
        </button>
      </div>
    </div>
  );
};

export default Create;
