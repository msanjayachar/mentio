import Image from "next/image";

const PresentationStarters = () => {
  return (
    <div className="flex-1 bg-[#F2F1F0]">
      <div className="flex h-full items-center justify-center gap-6">
        <div className="flex h-64 w-60 flex-col items-center gap-8 rounded-3xl border-2 bg-red-200 p-4 text-black">
          <Image
            src="/icons/start-cropped.svg"
            width={100}
            height={300}
            alt="testing svg images"
          />
          <div>
            <h1 className="text-xl">Start from scratch</h1>
            <p className="flex flex-col text-sm font-light text-gray-400">
              <span>Gain insights with word clouds,</span>
              <span>polls quizzes, and more.</span>
            </p>
          </div>
        </div>

        <div className="flex h-64 w-60 flex-col items-center gap-8 rounded-3xl border-2 bg-red-200 p-4 text-black">
          <Image
            src="/icons/template.svg"
            width={100}
            height={100}
            alt="testing svg images"
          />

          <div>
            <h1 className="text-xl">Use a template</h1>
            <p className="flex flex-col text-sm font-light text-gray-400">
              <span>Start with a ready-made template,</span>
              <span>or customize it to your needs.</span>
            </p>
          </div>
        </div>

        <div className="flex h-64 w-60 flex-col items-center gap-8 rounded-3xl border-2 bg-red-200 p-4 text-black">
          <Image
            src="/icons/import.svg"
            width={100}
            height={100}
            alt="testing svg images"
          />

          <div>
            <h1 className="text-xl">Start with AI</h1>
            <p className="flex flex-col text-sm font-light text-gray-400">
              <span>Use AI to build personalized</span>
              <span>quizzes, polls and surveys.</span>
            </p>
          </div>
        </div>

        <div className="flex h-64 w-60 flex-col items-center gap-8 rounded-3xl border-2 bg-red-200 p-4 text-black">
          <Image
            src="/icons/gemini.svg"
            width={100}
            height={100}
            alt="testing svg images"
          />

          <div>
            <h1 className="text-xl">Start with AI</h1>
            <p className="flex flex-col text-sm font-light text-gray-400">
              <span>Use AI to build personalized</span>
              <span>quizzes, polls and surveys.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationStarters;
