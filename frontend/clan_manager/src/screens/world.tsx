import { useEffect, useRef } from "react";
import { GenerateTerrain } from "../generations/terrain/generate";

export default function World({
  seed1,
  seed2,
  seed3,
  seed4
}: {
  seed1: number;
  seed2: number;
  seed3: number;
  seed4: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    GenerateTerrain(ctx, seed1, seed2, seed3, seed4);

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      console.log("clicou no pixel:", clickX, clickY);
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [seed1, seed2, seed3, seed4]);

  return (
    <canvas
      ref={canvasRef}
      width={1920}
      height={1080}
      style={{ border: "1px solid black" }}
    />
  );
}
