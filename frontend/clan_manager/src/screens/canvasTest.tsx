import { useEffect, useRef } from "react";
import { Grass } from "../components/grass";

export default function GameCanvas({ seed }: { seed: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    Grass.draw(ctx, 500, 50);

  }, [seed]);

  return (
    <canvas
      ref={canvasRef}
      width={512}
      height={512}
      style={{ border: "1px solid black" }}
    />
  );
}
