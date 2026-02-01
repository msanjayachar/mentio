import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const Question = ({
  slides,
  setSlides,
  selected,
  handleQuestionSelect,
  handleEdit,
  options,
}: {
  slides: (MCQSlide | PlainTextSlide)[];
  setSlides: Dispatch<SetStateAction<(MCQSlide | PlainTextSlide)[]>>;
  selected: number;
  handleQuestionSelect: () => void;
  handleEdit: () => void;
  options: Option[];
}) => {
  const [question, setQuestion] = useState<string | null>(null);

  const slide = slides.find((slide) => slide.id === selected);

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
            <div key={slide.id}>{slide.type}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
