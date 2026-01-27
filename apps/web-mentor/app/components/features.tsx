const Features = () => {
  return (
    <div className="mt-8 flex h-80 max-w-[1570px] flex-col gap-4 rounded-lg py-8">
      <div className="flex flex-wrap justify-between gap-4 rounded-xl bg-blue-100 px-8 py-8 text-black md:justify-start xl:justify-between">
        <h1 className="w-full pl-8 font-medium text-black">Popular features</h1>
        {/* Feature One */}
        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="h-44 w-44 rounded-lg border-2 border-transparent bg-gray-100 hover:border-blue-900">
            <div className="mt-8 ml-4 flex">
              <div className="ml-6 h-16 w-16 rounded-full bg-red-400" />
              <div className="-ml-6 h-16 w-16 rounded-full bg-red-400" />
            </div>
            <div className="-mt-4 ml-4 flex">
              <div className="ml-6 h-16 w-16 rounded-full bg-red-400" />
              <div className="-ml-6 h-16 w-16 rounded-full bg-red-400" />
            </div>
          </div>
          <span className="text-sm font-light">Word cloud</span>
        </div>
        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="flex h-44 w-44 scale-y-[-1] rounded-lg border-2 border-transparent bg-gray-100 p-8 hover:border-blue-900">
            <div className="h-12 w-8 bg-blue-500" />
            <div className="h-20 w-8 bg-blue-500" />
            <div className="h-28 w-8 bg-blue-500" />
          </div>
          <span className="text-sm font-light">Poll</span>
        </div>
        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="relative h-44 w-44 rounded-lg border-2 border-transparent bg-gray-100 p-10 hover:border-blue-900">
            <div className="h-24 w-24 rounded-full bg-red-300" />
            <div className="absolute inset-0 top-10 left-10 h-24 w-10 bg-red-300" />
          </div>
          <span className="text-sm font-light">Open Ended</span>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="h-44 w-44 rounded-lg border-2 border-transparent bg-gray-100 p-10 px-16 hover:border-blue-900">
            <div className="h-16 w-12 bg-blue-400" />
            <div className="h-8 w-12 bg-red-400" />
          </div>
          <span className="text-sm font-light">Scales</span>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="h-44 w-44 rounded-lg border-2 border-transparent bg-gray-100 hover:border-blue-900">
            <div className="flex scale-x-[-1] rounded-lg bg-gray-100 p-7">
              <div className="h-12 w-8 bg-green-600" />
              <div className="h-20 w-8 bg-green-600" />
              <div className="h-28 w-8 bg-green-600" />
            </div>
          </div>
          <span className="text-sm font-light">Ranking</span>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="flex h-44 w-44 items-center justify-center rounded-lg border-2 border-transparent bg-gray-100 hover:border-blue-900">
            <div className="h-12 w-12 bg-red-400"></div>
          </div>
          <span className="text-sm font-light">Pin on Image</span>
        </div>
      </div>
    </div>
  );
};

export default Features;
