import { SlideState } from "@shared/types";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Present = ({ slide }: { slide: SlideState }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    console.log("option:", option);
    setSelected(option);
  };

  useEffect(() => {
    console.log("selected: ", selected);
  }, [selected]);

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("connect", () => {
      console.log("connected:", socket.id);

      socket.emit("create-room");
    });

    socket.on("room-created", (roomId) => {
      console.log("room created: ", roomId);

      setRoomId(roomId);
      socket.emit("join-room", roomId);
    });

    socket.on("joined-room", (roomId) => {
      console.log("joined room: ", roomId);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (!slide) return <div>No Slide</div>;

  /* AT_HERE: Design the presentation slides view */
  return (
    <div className="mt-auto flex flex-col">
      <div className="fixed top-12 w-full items-center gap-2">
        <span className="block text-center text-lg">Join Room: </span>
        <h1 className="items-center text-center text-4xl tracking-widest">
          {roomId}
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        {slide.type === "multiple_choice" ? (
          <div className="gap-2">
            <h1 className="text-4xl text-black">
              {slide.question ? slide.question : "No question"}
            </h1>
            <h3 className="my-4">Select your answer from below: </h3>
            <div className="mt-4 flex flex-col gap-2">
              {slide.options.map((option) => (
                <div key={option.id}>
                  <button
                    className={`w-full cursor-pointer rounded-md border-2 border-black p-4 ${
                      selected === option.id ? "bg-blue-400" : "bg-gray-300"
                    }`}
                    onClick={() => handleSelect(option.id)}
                  >
                    <p>{option.text}</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>{slide.type}</div>
        )}
      </div>
    </div>
  );
};

export default Present;
