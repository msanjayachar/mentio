import { useState } from "react";
import SpeakerNotes from "./speakerNotes";

const Question = ({
  handleQuestionSelect,
  handleEdit,
}: {
  handleQuestionSelect: () => void;
  handleEdit: () => void;
}) => {
  const [speakerNotes, setSpeakerNotes] = useState(false);

  return (
    <div className="m-8 h-[700px] w-auto rounded-md border-2 hover:border-blue-800">
      <span className="flex justify-end px-4 py-2">Mentio</span>
      <div className="flex flex-col gap-6 px-4">
        <div className="px-8 pt-6">
          <input
            className="h-14 w-full rounded-md border-2 px-2 text-2xl hover:border-blue-800 focus:border-transparent focus:outline-2 focus:outline-blue-800"
            onSelect={() => {
              handleQuestionSelect();
            }}
            placeholder="Ask your question here..."
          />
        </div>

        <div
          className="bg-yell mx-8 flex h-[480px] w-auto cursor-pointer items-end justify-between gap-x-2 rounded-md border-2 px-12 pb-8 hover:border-blue-800"
          onClick={() => handleEdit()}
        >
          {/* Block: Option 1 */}
          <div className="flex flex-col items-center gap-2">
            <span className="flex w-full justify-start pl-2 text-2xl font-light">
              0
            </span>
            <div className="h-2 w-64 rounded-md bg-blue-600" />
            <span className="flex w-full justify-start text-2xl font-light">
              Option 1
            </span>
          </div>

          {/* Block: Option 2 */}
          <div className="flex flex-col items-center gap-2">
            <span className="flex w-full justify-start pl-2 text-2xl font-light">
              0
            </span>
            <div className="h-2 w-64 rounded-md bg-red-500" />
            <span className="flex w-full justify-start text-2xl font-light">
              Option 2
            </span>
          </div>

          {/* Block: Option 3 */}
          <div className="flex flex-col items-center gap-2">
            <span className="flex w-full justify-start pl-2 text-2xl font-light">
              0
            </span>
            <div className="h-2 w-64 rounded-md bg-blue-800" />
            <span className="flex w-full justify-start text-2xl font-light">
              Option 3
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
