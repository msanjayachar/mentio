import Image from "next/image";

const Features = () => {
  return (
    <div className="mt-8 ml-4 flex h-80 max-w-[1500px] flex-col gap-4 rounded-lg py-8">
      <div className="flex flex-wrap justify-start gap-4 rounded-xl bg-blue-100 px-8 py-8 text-black sm:flex-nowrap sm:justify-between md:justify-start xl:justify-between">
        {/* TODO: Fix this  */}
        {/* <h1 className="w-full pl-8 font-medium text-black">Popular features</h1> */}
        {/* Feature One */}
        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="size-32 rounded-lg border-2 border-transparent bg-gray-100 hover:border-blue-900 md:size-44">
            <Image
              src="/features/word_count.svg"
              alt="testing svg images"
              width={1000}
              height={1000}
            />
          </div>
          <span className="text-sm font-light">Word cloud</span>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="flex size-32 rounded-lg border-2 border-transparent bg-gray-100 p-8 hover:border-blue-900 md:size-44">
            <Image
              src="/features/poll.svg"
              alt="testing svg images"
              width={100}
              height={100}
            />
          </div>
          <span className="text-sm font-light">Poll</span>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="relative size-32 rounded-lg border-2 border-transparent bg-gray-100 p-10 hover:border-blue-900 md:size-44">
            <Image
              src="/features/open_ended.svg"
              alt="testing svg images"
              width={1000}
              height={1000}
              sizes="2"
            />
          </div>
          <span className="text-sm font-light">Open Ended</span>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="flex size-32 items-center justify-center rounded-lg border-2 border-transparent bg-gray-100 p-10 hover:border-blue-900 md:size-44">
            <Image
              src="/features/scales.svg"
              alt="testing svg images"
              width={500}
              height={500}
            />
          </div>
          <span className="text-sm font-light">Scales</span>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="size-32 rounded-lg border-2 border-transparent bg-gray-100 hover:border-blue-900 md:size-44">
            <div className="mt-5 flex scale-x-[-1] rounded-lg bg-gray-100 p-7">
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

        <div className="flex cursor-pointer flex-col items-center gap-2 sm:hidden lg:flex">
          <div className="flex size-32 items-center justify-center rounded-lg border-2 border-transparent bg-gray-100 pb-6 hover:border-blue-900 md:size-44">
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
