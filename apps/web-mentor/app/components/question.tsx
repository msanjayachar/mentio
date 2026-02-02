import { GripVertical } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

const Question = ({
  slides,
  setSlides,
  selected,
  handleQuestionSelect,
  handleEdit,
}: {
  slides: (MCQSlide | PlainTextSlide)[];
  setSlides: Dispatch<SetStateAction<(MCQSlide | PlainTextSlide)[]>>;
  selected: number;
  handleQuestionSelect: () => void;
  handleEdit: () => void;
}) => {
  const [contents, setContents] = useState({
    id: "one",
    title: "",
    description: "",
  });

  const slide = slides.find((slide) => slide.id === selected);

  const colors = [
    "bg-blue-500",
    "bg-rose-400",
    "bg-indigo-300",
    "bg-indigo-900",
    "bg-red-800",
  ];

  const handleUpdate = (e: ChangeEvent<HTMLInputElement>) => {
    setSlides((slides) =>
      slides.map((slide) =>
        slide.id === selected
          ? {
              ...slide,
              question: e.target.value,
            }
          : slide,
      ),
    );
  };

  const handleContent = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    type: "title" | "description",
  ) => {
    if (type === "title") {
      setContents((prev) => ({
        ...prev,
        title: e.target.value,
      }));
    } else if (type === "description") {
      setContents((prev) => ({
        ...prev,
        description: e.target.value,
      }));
    }
  };

  // TODO:
  // const createNewInput = (id: string) => {};
  // const createNewTextArea = (id: string) => {};

  if (!slide) return null;

  return (
    <div className="m-8 h-[700px] w-auto rounded-md border-2 bg-white hover:border-blue-800">
      <span className="flex justify-end pt-4 pr-4">Mentio</span>
      <div className="flex flex-col gap-6 px-4">
        {slide.type === "multiple_choice" && (
          <div className="px-8 pt-6">
            {/* THREAD: */}
            <input
              value={slide.question}
              className="h-18 w-full rounded-md border-2 px-4 text-2xl hover:border-blue-800 focus:border-transparent focus:outline-2 focus:outline-blue-800"
              onChange={(e) => {
                handleUpdate(e);
              }}
              onFocus={() => {
                handleQuestionSelect();
              }}
              placeholder="Ask your question here..."
            />
          </div>
        )}
        {/* TODO: Dynamic width and height */}
        <div
          className={`bg-yell mx-8 flex ${slide.type === "multiple_choice" ? "h-[480px]" : "h-[600px]"} w-auto cursor-pointer items-end justify-between gap-x-2 rounded-md border-2 px-12 pb-8 hover:border-blue-800`}
          onClick={() => handleEdit()}
        >
          {slide.type === "multiple_choice" ? (
            slide.options.map((opt) => (
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
            ))
          ) : (
            <div className="flex h-full w-full flex-col gap-8 px-8 py-4">
              <div className="relative flex flex-col gap-4">
                <div className="flex justify-between">
                  <div className="m-2">
                    <GripVertical />
                  </div>
                  <input
                    value={contents.title}
                    onChange={(e) => handleContent(e, "title")}
                    placeholder="Enter your Title"
                    className="w-full rounded-lg bg-gray-200 px-2"
                  />
                </div>
                <div className="flex justify-between">
                  <div className="m-2">
                    <GripVertical />
                  </div>
                  <textarea
                    value={contents.description}
                    onChange={(e) => handleContent(e, "description")}
                    rows={4}
                    placeholder="Enter your description here"
                    className="w-full rounded-lg bg-gray-200 px-2 py-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
