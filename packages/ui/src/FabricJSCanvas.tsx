import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Canvas, Rect, Textbox } from "fabric";
import { SlidesState } from "../../shared/src/types";
import { FabricImage } from "fabric";
import { CanvasSlide, SlideState } from "../../shared/src/mcq";
import { FabricObject } from "fabric";

export const FabricJSCanvas = ({
  tool,
  backgroundColor,
  slide,
  slides,
  setSlides,
  onSave,
}: {
  tool: "text" | "shapes" | "image";
  backgroundColor: string;
  slide: CanvasSlide;
  slides: SlidesState;
  setSlides?: Dispatch<SetStateAction<SlidesState>>;
  onSave: (canvasSlide: CanvasSlide) => Promise<Response>;
}) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [canvasState, setCanvasState] = useState<FabricObject | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const toolRef = useRef(tool);
  const canvasRef = useRef<Canvas | null>(null);

  const updateCanvasContext = (canvas: Canvas | null) => {};

  const handleUpdate = (state: any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onSave({
        ...slide,
        canvasObject: state,
      });
    }, 600);
  };

  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  useEffect(() => {
    if (!canvasEl.current) return;

    const save = () => {
      const state = canvas.toJSON();

      setCanvasState(state);
      handleUpdate(state);

      if (!setSlides) return;

      setSlides((prev) => ({
        ...prev,
        canvasSlides: prev.canvasSlides.map((canvasSlide) =>
          canvasSlide.id === slide.id
            ? // ? { ...canvasSlide, object: canvasState }
              { ...canvasSlide, object: state }
            : canvasSlide,
        ),
      }));
    };

    const canvas = new Canvas(canvasEl.current, {
      backgroundColor: "rgb(255, 255, 255)",
      selectionColor: "blue",
      selectionLineWidth: 2,
    });

    canvasRef.current = canvas;
    canvas.renderAll();

    canvas.on("mouse:dblclick", (event) => {
      const { x, y } = event.scenePoint;

      if (toolRef.current === "text") {
        const textBox = new Textbox("", {
          width: canvas.getWidth() / 2,
          left: x,
          top: y,
          originX: "left",
          originY: "top",
        });

        canvas.add(textBox);
        canvas.setActiveObject(textBox);
        textBox.enterEditing();
      }

      if (toolRef.current === "image") {
        const imgEl = new window.Image();
        imgEl.src =
          "https://fastly.picsum.photos/id/974/200/300.jpg?hmac=QEuRqsjG8spkqu72dWfkl4m-kSl5p-CEfHgx9dnnZLo";

        FabricImage.fromURL(
          "https://fastly.picsum.photos/id/974/200/300.jpg?hmac=QEuRqsjG8spkqu72dWfkl4m-kSl5p-CEfHgx9dnnZLo",
        ).then((img) => {
          canvas.add(img);
        });
      }

      if (toolRef.current === "shapes") {
        const rect = new Rect({ width: 100, height: 100, fill: "red" });

        canvas.add(rect);
        canvas.centerObject(rect);
        canvas.setActiveObject(rect);
      }
    });

    canvas.on("object:added", save);
    canvas.on("object:modified", save);
    canvas.on("object:removed", save);
    canvas.on("text:changed", save);

    const resizeCanvas = () => {
      if (!canvasEl.current) return;

      // const parent = canvasEl.current.parentElement;
      const parent = containerRef.current;
      if (!parent) return;

      const { width, height } = parent.getBoundingClientRect();

      canvas.setDimensions({
        width: Math.floor(width) - 4,
        height: Math.floor(height) - 4,
      });
      canvas.renderAll();
    };

    // make the fabric.Canvas instance available to your app
    updateCanvasContext(canvas);
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      updateCanvasContext(null);
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    console.log("hello from useEffect");
    if (!canvasEl.current) return;

    // const canvas = (canvasEl.current as any).__fabricInstance;
    const canvas = canvasRef.current;
    console.log(!canvas);
    if (!canvas || !slide.canvasObject) return;

    canvas.loadFromJSON(slide.canvasObject).then(() => {
      console.log("hello from loadFromJSON");
      canvas.renderAll();
    });
  }, []);

  return (
    // AT_HERE: fill the canvas with the height and width of the container/parent div
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", border: "2px solid black" }}
    >
      <canvas ref={canvasEl} />
    </div>
  );
};
