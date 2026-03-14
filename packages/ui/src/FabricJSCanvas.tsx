import { useEffect, useRef, useState } from "react";
import { Canvas, Textbox } from "fabric";

export const FabricJSCanvas = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [canvasState, setCanvasState] = useState(null);

  const updateCanvasContext = (canvas: Canvas | null) => {};

  useEffect(() => {
    console.log("*************************");
    console.log("canvasState: ", canvasState);
    console.log("*************************");
  }, [canvasState]);

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

    // make the fabric.Canvas instance available to your app
    updateCanvasContext(canvas);
    return () => {
      updateCanvasContext(null);
      canvas.dispose();
    };
  }, []);

  return (
    <canvas
      style={{ border: "1px solid black" }}
      width="800"
      height="500"
      ref={canvasEl}
    />
  );
};
