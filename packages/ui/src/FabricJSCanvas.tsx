import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Canvas, Rect, Textbox } from "fabric";
import { SlidesState } from "../../shared/src/types";
import { FabricImage } from "fabric";
import { CanvasSlide } from "../../shared/src/canvas";
import { FabricObject } from "fabric";

const BASE_WIDTH = 800;
const BASE_HEIGHT = 600;

export const FabricJSCanvas = ({
  tool,
  backgroundColor,
  slide,
  slides,
  setSlides,
  onSave,
  selectedSlide,
}: {
  tool: "text" | "shapes" | "image";
  backgroundColor: string;
  slide: CanvasSlide;
  slides: SlidesState;
  setSlides?: Dispatch<SetStateAction<SlidesState>>;
  onSave: (canvasSlide: CanvasSlide, canvasId: string) => Promise<Response>;
  selectedSlide: string;
}) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [canvasState, setCanvasState] = useState<FabricObject | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const toolRef = useRef(tool);
  const canvasRef = useRef<Canvas | null>(null);
  const selectedCanvasSlide = useRef<CanvasSlide | undefined>(undefined);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const updateCanvasContext = (canvas: Canvas | null) => {};

  useEffect(() => {
    selectedCanvasSlide.current = slides.find(
      (slide): slide is CanvasSlide =>
        slide.type == "canvas_slide" && slide.id === selectedSlide,
    );
  }, [slides, selectedSlide]);

  const handleUpdate = (state: any) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const currentSlide = selectedCanvasSlide.current;

    if (!currentSlide) return;

    timeoutRef.current = setTimeout(async () => {
      await onSave(
        {
          ...currentSlide,
          canvasObject: state,
        },
        selectedSlide,
      );
    }, 600);
  };

  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  const resizeCanvas = (container: HTMLDivElement, canvas: Canvas) => {
    if (!container || !canvas) return;

    const { width, height } = container.getBoundingClientRect();
    const newWidth = Math.floor(width) - 4;
    const newHeight = Math.floor(height) - 4;

    canvas.setDimensions({ width: newWidth, height: newHeight });

    const scaleX = newWidth / BASE_WIDTH;
    const scaleY = newHeight / BASE_HEIGHT;
    const scale = Math.min(scaleX, scaleY);

    canvas.setViewportTransform([scale, 0, 0, scale, 0, 0]);
    canvas.renderAll();
  };

  useEffect(() => {
    if (!canvasEl.current) return;

    const save = () => {
      const state = canvas.toJSON();

      setCanvasState(state);
      handleUpdate(state);

      if (!setSlides) return;

      setSlides((prev) =>
        prev.map((canvasSlide) =>
          canvasSlide.id === slide.id
            ? { ...canvasSlide, canvasObject: state }
            : canvasSlide,
        ),
      );
    };

    const canvas = new Canvas(canvasEl.current, {
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
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

    updateCanvasContext(canvas);

    if (containerRef.current) {
      resizeCanvas(containerRef.current, canvas);

      resizeObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          resizeCanvas(entry.target as HTMLDivElement, canvas);
        }
      });

      resizeObserverRef.current.observe(containerRef.current);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      updateCanvasContext(null);
      canvas.dispose();
    };
  }, [selectedSlide]);

  const lastLoadedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !slide.canvasObject) return;

    const key = JSON.stringify(slide.canvasObject);

    if (lastLoadedRef.current === key) return;
    lastLoadedRef.current = key;

    canvasRef.current.loadFromJSON(slide.canvasObject).then(() => {
      canvasRef.current?.requestRenderAll();
      if (canvasRef.current && containerRef.current) {
        resizeCanvas(containerRef.current, canvasRef.current);
      }
    });
  }, [selectedSlide]);

  return (
    <div ref={containerRef} className="h-full w-full border-2 border-black">
      <canvas ref={canvasEl} />
    </div>
  );
};
