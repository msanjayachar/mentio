import Image from "next/image";
import { options } from "data/slides";
import { Dispatch, SetStateAction } from "react";

const NewSlide = ({
  slides,
  setSlides,
  setShowSlideOption,
}: {
  slides: (MCQSlide | PlainTextSlide)[];
  setSlides: Dispatch<SetStateAction<(MCQSlide | PlainTextSlide)[]>>;
  setShowSlideOption: Dispatch<SetStateAction<boolean>>;
}) => {
  const createSlide = (type: string) => {
    const last = slides[slides.length - 1];

    if (!last) return;

    if (type === "multiple_choice") {
      setSlides((prev) => [
        ...prev,
        {
          id: last.id + 1,
          type: "multiple_choice",
          question: "",
          options: options,
          correctAnswers: [],
          allowMultiple: false,
          required: true,
        },
      ]);
    } else if (type === "plain_text") {
      setSlides((prev) => [
        ...prev,
        {
          id: last.id + 1,
          type: "plain_text",
          contents: [""],
        },
      ]);
    }

    setShowSlideOption(false);
  };

  return (
    <div className="flex h-18 w-full justify-around rounded-lg border-2 border-gray-300 bg-white p-2">
      <button
        className="flex-1 cursor-pointer"
        onClick={() => createSlide("multiple_choice")}
      >
        <div className="flex">
          <Image
            src="/features/poll_two.svg"
            alt="testing svg images"
            width={50}
            height={50}
          />

          <span className="m-auto w-full cursor-pointer text-sm">
            Multiple Choice
          </span>
        </div>
      </button>

      <button
        className="flex-1 cursor-pointer"
        onClick={() => createSlide("plain_text")}
      >
        <div className="flex">
          <Image
            src="/features/open_ended.svg"
            alt="testing svg images"
            width={50}
            height={50}
          />
          <span className="m-auto w-full cursor-pointer text-sm">
            Plain Text
          </span>
        </div>
      </button>
    </div>
  );
};

export default NewSlide;
