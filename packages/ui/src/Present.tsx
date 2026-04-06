import { SlideState } from "../../shared//src/types";
import { useState, useEffect, useRef } from "react";
import { Canvas } from "fabric";

interface PresentProps {
  slide: SlideState;
  roomId: string | null;
  onSubmitAnswer?: (questionId: string, answer: string) => void;
  readOnly?: boolean;
}

const Present = ({
  slide,
  roomId,
  onSubmitAnswer,
  readOnly = false,
}: PresentProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<Canvas | null>(null);

  const handleSelect = (option: string) => {
    if (!readOnly) {
      setSelected(option);
    }
  };

  const handleSubmit = () => {
    if (selected && onSubmitAnswer && slide.id) {
      onSubmitAnswer(slide.id, selected);
      setSelected(null);
    }
  };

  useEffect(() => {
    if (slide.type !== "canvas_slide" || !canvasRef.current) return;

    const canvasEl = canvasRef.current;

    if (fabricRef.current) {
      fabricRef.current.dispose();
    }

    const canvas = new Canvas(canvasEl, {
      width: 800,
      height: 500,
      backgroundColor: "white",
      selection: !readOnly,
    });
    fabricRef.current = canvas;

    const canvasSlide = slide as { canvasObject?: unknown };
    if (canvasSlide.canvasObject) {
      canvas.loadFromJSON(canvasSlide.canvasObject).then(() => {
        canvas.renderAll();
      });
    }

    return () => {
      canvas.dispose();
      fabricRef.current = null;
    };
  }, [slide, readOnly]);

  if (!slide) return <div>No Slide</div>;

  const slideType = (slide as { type?: string }).type;

  if (slideType === "multiple_choice") {
    const mcqSlide = slide as {
      question?: string;
      options?: { id: string; text: string }[];
    };
    return (
      <div className="mt-auto flex flex-col">
        <div className="w-full max-w-xl items-center gap-2">
          <span className="block text-center text-lg">Join Room: </span>
          <h1 className="items-center text-center text-4xl tracking-widest">
            {roomId}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl text-black">
              {mcqSlide.question ? mcqSlide.question : "No question"}
            </h1>
            <h3 className="my-4">Select your answer from below: </h3>
            <div className="flex flex-col gap-2">
              {mcqSlide.options?.map((option) => (
                <div key={option.id}>
                  <button
                    type="button"
                    className={`w-full cursor-pointer rounded-md border-2 border-black p-4 ${
                      selected === option.id ? "bg-blue-400" : "bg-gray-300"
                    } ${readOnly ? "cursor-not-allowed opacity-50" : ""}`}
                    onClick={() => handleSelect(option.id)}
                    disabled={readOnly}
                  >
                    <p className="text-black">{option.text}</p>
                  </button>
                </div>
              ))}
            </div>
            {selected && !readOnly && (
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-4 rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600"
              >
                Submit Answer
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (slideType === "canvas_slide") {
    return (
      <div className="mt-auto flex flex-col">
        <div className="w-full max-w-xl items-center gap-2">
          <span className="block text-center text-lg">Join Room: </span>
          <h1 className="items-center text-center text-4xl tracking-widest">
            {roomId}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="rounded border-2 border-black">
            <canvas ref={canvasRef} />
          </div>
        </div>
      </div>
    );
  }

  return <div>Unknown slide type: {slideType}</div>;
};

export default Present;
