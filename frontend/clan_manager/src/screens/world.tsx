import { useEffect, useRef } from "react";
import { GenerateTerrain } from "../generations/terrain/generate";
import api from "../api";

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
}) {//!!! a criação de seeds deve ser automática, n ser passada como parâmetro no app!!!
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;

    const ctx: CanvasRenderingContext2D = rawCtx;

    async function verifyUserArchipelagos() {
      try {
        const res = await api.get("/archipelagoRoute.php",{withCredentials:true})
        const seeds = res.data.msg;
        if (seeds) {
          GenerateTerrain(ctx, seeds[0], seeds[1], seeds[2], seeds[3]);
        }
      } catch (error) {
        GenerateTerrain(ctx, seed1, seed2, seed3, seed4);
      }
    }

    verifyUserArchipelagos();

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
