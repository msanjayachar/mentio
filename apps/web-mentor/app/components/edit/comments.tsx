import { X } from "lucide-react";
import Image from "next/image";

const Comments = ({
  commentSelected,
  handleComment,
}: {
  commentSelected: boolean;
  handleComment: () => void;
}) => {
  return (
    <div
      className={`${commentSelected ? "block" : "hidden"} relative mx-4 my-8 h-[calc(100vh-8rem)] w-[360px] rounded-xl border-2 border-gray-200 p-8`}
    >
      <div className="flex items-center justify-between">
        <span className="text-lg font-light text-gray-700">Comments</span>
        <button onClick={() => handleComment()}>
          <X size={16} />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <Image
          src="/icons/comment.svg"
          width={500}
          height={500}
          alt="testing svg images"
        />
        <span className="flex text-center text-lg font-light text-gray-500">
          Write a note or @mention someone on this slide
        </span>
      </div>
      <div className="absolute bottom-0 my-8 flex h-14 w-74 items-center rounded-md bg-gray-200 px-4 text-xl font-light">
        <input placeholder="Enter your comment here..." />
      </div>
    </div>
  );
};

export default Comments;
