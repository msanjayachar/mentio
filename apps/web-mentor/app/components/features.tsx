import Image from "next/image";

const Features = () => {
  return (
    <div className="mt-8 ml-4 flex h-80 w-auto max-w-[1500px] flex-col gap-4 rounded-lg py-8">
      <div className="flex flex-wrap items-center justify-start gap-10 rounded-xl bg-blue-100 px-8 py-8 text-black sm:flex-nowrap sm:justify-between md:justify-start lg:justify-between">
        {/* TODO: Fix this  */}
        {/* <h1 className="w-full pl-8 font-medium text-black">Popular features</h1> */}
        {/* Feature One */}
        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="size-28 rounded-lg border-2 border-transparent bg-gray-100 hover:border-blue-900 sm:size-22 md:h-auto md:w-auto md:max-w-40 lg:max-h-36 lg:max-w-36 2xl:max-h-44 2xl:max-w-44">
            <Image
              src="/features/word_count.svg"
              alt="testing svg images"
              width={1000}
              height={1000}
            />
          </div>
          <span className="text-sm font-light">Word cloud</span>
        </div>

        {/* Feature Two */}
        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="flex size-28 rounded-lg border-2 border-transparent bg-gray-100 hover:border-blue-900 sm:size-22 md:h-auto md:w-auto md:max-w-40 lg:max-h-36 lg:max-w-36 2xl:max-h-44 2xl:max-w-44">
            <Image
              src="/features/poll_two.svg"
              alt="testing svg images"
              width={1000}
              height={1000}
            />
          </div>
          <span className="text-sm font-light">Poll</span>
        </div>

        {/* Feature Three */}
        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="relative size-28 rounded-lg border-2 border-transparent bg-gray-100 hover:border-blue-900 sm:size-22 md:h-auto md:w-auto md:max-w-40 lg:max-h-36 lg:max-w-36 2xl:max-h-44 2xl:max-w-44">
            <Image
              src="/features/open_ended.svg"
              alt="testing svg images"
              width={1000}
              height={1000}
            />
          </div>
          <span className="text-sm font-light">Open Ended</span>
        </div>

        {/* Feature Four */}
        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="flex size-28 items-center justify-center rounded-lg border-2 border-transparent bg-gray-100 hover:border-blue-900 sm:size-22 md:h-auto md:w-auto md:max-w-40 lg:max-h-36 lg:max-w-36 2xl:max-h-44 2xl:max-w-44">
            <Image
              src="/features/scales.svg"
              alt="testing svg images"
              width={1000}
              height={1000}
            />
          </div>
          <span className="text-sm font-light">Scales</span>
        </div>

        {/* Feature Five */}
        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="size-28 rounded-lg border-2 border-transparent bg-gray-100 hover:border-blue-900 sm:size-22 md:h-auto md:w-auto md:max-w-40 lg:max-h-36 lg:max-w-36 2xl:max-h-44 2xl:max-w-44">
            <div className="flex scale-x-[-1] rounded-lg bg-gray-100">
              <Image
                src="/features/rankings.svg"
                alt="testing svg images"
                width={1000}
                height={1000}
              />
            </div>
          </div>
          <span className="text-sm font-light">Ranking</span>
        </div>

        {/* Feature Six */}
        <div className="cursor-pointer flex-col items-center gap-2 sm:hidden [@media(min-width:1100px)]:flex">
          <div className="flex size-28 items-center justify-center rounded-lg border-2 border-transparent bg-gray-100 hover:border-blue-900 sm:size-22 md:h-auto md:w-auto md:max-w-40 lg:max-h-36 lg:max-w-36 2xl:max-h-44 2xl:max-w-44">
            <Image
              src="/features/pin.svg"
              alt="testing svg images"
              width={1000}
              height={1000}
            />
          </div>
          <span className="text-sm font-light">Pin on Image</span>
        </div>
      </div>
    </div>
  );
};

export default Features;
