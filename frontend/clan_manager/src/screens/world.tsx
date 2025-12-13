import { useEffect, useRef } from "react";
import { GenerateTerrain } from "../generations/terrain/generate";
import api from "../api";

export default function World() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rawCtx = canvas.getContext("2d");
    if (!rawCtx) return;

    const ctx: CanvasRenderingContext2D = rawCtx;

    function generateSeedBigInt(): bigint {
      let result = 0n;
      for (let i = 0; i < 20; i++) {
        const digit = BigInt(Math.floor(Math.random() * 9) + 1);
        result = result * 10n + digit;
      }
      return result;
    }

    function seedToNumber(seed: bigint): number {
      return Number(seed % 2147483647n);
    }

    const seed1 = seedToNumber(generateSeedBigInt());
    const seed2 = seedToNumber(generateSeedBigInt());
    const seed3 = seedToNumber(generateSeedBigInt());
    const seed4 = seedToNumber(generateSeedBigInt());

    async function verifyUserArchipelagos() {
      try {
        const res = await api.get("/archipelagoRoute.php", {
          withCredentials: true
        });

        const seeds = res.data.msg;

        if (seeds) {
          GenerateTerrain(
            ctx,
            Number(seeds[0]),
            Number(seeds[1] ?? ""),
            Number(seeds[2] ?? ""),
            Number(seeds[3] ?? "")
          );
          return;
        }

        GenerateTerrain(ctx, seed1, seed2, seed3, seed4);
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={1920}
      height={1080}
      style={{ border: "1px solid black" }}
    />
  );
}
