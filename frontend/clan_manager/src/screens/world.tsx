import { useEffect, useRef } from "react";
import { GenerateTerrain } from "../generations/terrain/generate";
import { verifyUserArchipelagos } from "../connections/archipelagos";

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

    const initializeWorld = async () => {
      // 1. Busca do banco
      const dbSeeds = await verifyUserArchipelagos();
      
      console.log("Seeds recebidas no World:", dbSeeds); // <--- OLHE O CONSOLE (F12)

      // 2. Se vier algo preenchido, CARREGA
      if (dbSeeds && dbSeeds.length > 0) {
        console.log("--> CARREGANDO JOGO EXISTENTE");
        
        // Garante que temos 4 seeds (completa com aleatório se faltar, pra não travar)
        while(dbSeeds.length < 4) dbSeeds.push(seedToNumber(generateSeedBigInt()));

        // Passa FALSE no final para NÃO SALVAR de novo
        GenerateTerrain(ctx, Number(dbSeeds[0]), Number(dbSeeds[1]), Number(dbSeeds[2]), Number(dbSeeds[3]), false);
      }

      // 3. Se vier vazio, CRIA NOVO
      else {
        console.log("--> CRIANDO NOVO JOGO");
        const s1 = seedToNumber(generateSeedBigInt());
        const s2 = seedToNumber(generateSeedBigInt());
        const s3 = seedToNumber(generateSeedBigInt());
        const s4 = seedToNumber(generateSeedBigInt());

        // Passa TRUE no final para SALVAR
        GenerateTerrain(ctx, s1, s2, s3, s4, true);
      }
    };

    initializeWorld();

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