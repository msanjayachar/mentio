import { ArrowLeft, X } from "lucide-react";

// ATHERE:
const Questionpanel = ({ questionSelected }: { questionSelected: boolean }) => {
  return (
    <div
      className={`${questionSelected ? "block" : "hidden"} relative mx-4 my-8 h-[calc(100vh-8rem)] w-[360px] rounded-xl border-2 border-gray-200 p-8`}
    >
      <div className="flex items-center justify-between">
        <div className="flex justify-between gap-4">
          <ArrowLeft size={20} />
          <span>Question</span>
        </div>
        <X size={16} />
      </div>

      <br />
      <br />

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span>Label </span>
          <div className="flex h-4 w-4 items-center justify-center rounded-full border border-black text-[10px] leading-none font-semibold text-gray-700">
            ?
          </div>
        </div>

        <input
          className="h-12 w-full rounded-md bg-gray-200 px-2 font-light"
          placeholder="Enter label here..."
        />
      </div>

      <br />
      <br />

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span>Additional details </span>
          <div className="flex h-4 w-4 items-center justify-center rounded-full border border-black text-[10px] leading-none font-semibold text-gray-700">
            ?
          </div>
        </div>

        <textarea
          rows={4}
          cols={50}
          className="mb-10 w-full rounded-md bg-gray-200 px-2 py-4 font-light"
          placeholder="Enter additional details here..."
        />
      </div>

      <hr className="mt-4 rounded-full border-t border-gray-300" />
    </div>
  );
};

export default Questionpanel;
