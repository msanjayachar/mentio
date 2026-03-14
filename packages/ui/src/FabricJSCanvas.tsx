import { useEffect, useRef } from "react";
import { Canvas, Rect } from "fabric";

export const FabricJSCanvas = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  const updateCanvasContext = (canvas: Canvas | null) => {};

  const rect = new Rect({
    width: 100,
    height: 100,
    fill: "red",
    left: 50,
    top: 50,
  });

  useEffect(() => {
    if (!canvasEl.current) return;

    const canvas = new Canvas(canvasEl.current, {
      backgroundColor: "rgb(255, 255, 255)",
      selectionColor: "blue",
      selectionLineWidth: 2,
    });

    canvas.renderAll();
    canvas.add(rect);

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
      width="300"
      height="300"
      ref={canvasEl}
    />
  );
};
