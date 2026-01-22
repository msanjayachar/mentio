const Features = () => {
  return (
    <div className="mt-8 flex h-80 w-full flex-col gap-4 rounded-lg bg-blue-100 py-8">
      <h1 className="pl-8 font-medium text-black">Popular features</h1>
      <div className="flex justify-between px-8 text-black">
        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="h-44 w-44 rounded-lg bg-gray-100">
            <div className="mt-8 ml-4 flex">
              <div className="ml-6 h-16 w-16 rounded-full bg-red-400" />
              <div className="-ml-6 h-16 w-16 rounded-full bg-red-400" />
            </div>
            <div className="-mt-4 ml-4 flex">
              <div className="ml-6 h-16 w-16 rounded-full bg-red-400" />
              <div className="-ml-6 h-16 w-16 rounded-full bg-red-400" />
            </div>
          </div>
          <span>Word cloud</span>
        </div>
        {/* ATHERE: */}
        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="flex h-44 w-44 scale-y-[-1] rounded-lg bg-gray-100 p-8">
            <div className="h-12 w-8 bg-blue-500" />
            <div className="h-20 w-8 bg-blue-500" />
            <div className="h-28 w-8 bg-blue-500" />
          </div>
          <span>Poll</span>
        </div>
        <div className="items-centerg flex cursor-pointer flex-col gap-2">
          <div className="relative h-44 w-44 rounded-lg bg-gray-100 p-10">
            <div className="h-24 w-24 rounded-full bg-red-300" />
            <div className="absolute inset-0 top-10 left-10 h-24 w-10 bg-red-300" />
          </div>
          <span>Open Ended</span>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="h-44 w-44 rounded-lg bg-gray-100 p-10 px-16">
            <div className="h-16 w-12 bg-blue-400" />
            <div className="h-8 w-12 bg-red-400" />
          </div>
          <span>Scales</span>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="h-44 w-44 rounded-lg bg-gray-100">
            <div className="flex h-44 w-44 scale-x-[-1] rounded-lg bg-gray-100 p-8">
              <div className="h-12 w-8 bg-green-600" />
              <div className="h-20 w-8 bg-green-600" />
              <div className="h-28 w-8 bg-green-600" />
            </div>
          </div>
          <span>Ranking</span>
        </div>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <div className="flex h-44 w-44 items-center justify-center rounded-lg bg-gray-100">
            <div className="h-12 w-12 bg-red-400"></div>
          </div>
          <span>Pin on Image</span>
        </div>
      </div>
    </div>
  );
};

export default Features;
