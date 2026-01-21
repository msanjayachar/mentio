import Link from "next/link";

export default function Page() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-gray-500">
      <div className="absolute top-48">
        <div className="flex w-84 flex-col items-center gap-2">
          <h1 className="text-3xl">Mentio</h1>
          <h2 className="text-2xl">Enter the code to join</h2>
          <p className="text-md mb-8 text-gray-300">
            It&apos;s on the screen in front of you
          </p>
        </div>
        <div className="flex flex-col items-center gap-8">
          <input
            placeholder="1234 5678"
            className="h-16 w-full rounded-xl border-2 border-transparent bg-gray-200 px-4 text-black ring-4 ring-transparent ring-offset-6 ring-offset-gray-500 duration-75 outline-none hover:border-blue-400 focus:border-blue-400 focus:ring-blue-200"
          />
          <button className="h-12 w-20 cursor-pointer rounded-full bg-red-400">
            Join
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 mb-12">
        Create your own Presentation at{" "}
        <Link className="bg-gray-500 underline" target="_blank" href="/mentor">
          mentio.com
        </Link>
      </div>
    </div>
  );
}
