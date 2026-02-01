import { useEffect, useState } from "react";

const Question = ({
  handleQuestionSelect,
  handleEdit,
  options,
}: {
  handleQuestionSelect: () => void;
  handleEdit: () => void;
  options: Option[];
}) => {
  const [question, setQuestion] = useState<string | null>(null);

  const colors = [
    "bg-blue-500",
    "bg-rose-400",
    "bg-indigo-300",
    "bg-indigo-900",
    "bg-red-800",
  ];

  useEffect(() => {
    console.log("question: ", question);
  }, [question]);

  useEffect(() => {
    console.log("options: ", options);
  }, [options]);

  return (
    <div className="m-8 h-[700px] w-auto rounded-md border-2 bg-white hover:border-blue-800">
      <span className="flex justify-end pt-4 pr-4">Mentio</span>
      <div className="flex flex-col gap-6 px-4">
        <div className="px-8 pt-6">
          <input
            className="h-18 w-full rounded-md border-2 px-4 text-2xl hover:border-blue-800 focus:border-transparent focus:outline-2 focus:outline-blue-800"
            onChange={(e) => {
              setQuestion(e.target.value);
            }}
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
          {options.map((opt) => (
            <div key={opt.id} className="flex flex-col items-center gap-2">
              <span className="flex w-full justify-start pl-2 text-2xl font-light">
                0
              </span>
              <div className={`h-2 w-64 rounded-md ${colors[opt.id - 1]}`} />
              <span className="flex w-full justify-start text-2xl font-light">
                {/* Option {opt.id} */}
                {opt.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;
