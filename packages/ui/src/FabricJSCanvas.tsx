import { useEffect, useRef, useState } from "react";
import { Canvas, Textbox } from "fabric";

export const FabricJSCanvas = ({
  tool,
  backgroundColor,
}: {
  tool: "text" | "shapes" | "image";
  backgroundColor: string;
}) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [canvasState, setCanvasState] = useState(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateCanvasContext = (canvas: Canvas | null) => {};

  useEffect(() => {
    if (!canvasEl.current) return;

    const save = () => {
      const state = canvas.toJSON();

      setCanvasState(state);
    };

    const canvas = new Canvas(canvasEl.current, {
      backgroundColor: "rgb(255, 255, 255)",
      selectionColor: "blue",
      selectionLineWidth: 2,
    });

    canvas.renderAll();

    canvas.on("mouse:dblclick", (event) => {
      const { x, y } = event.scenePoint;

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
