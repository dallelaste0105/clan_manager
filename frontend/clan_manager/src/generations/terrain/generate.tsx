import { Grass } from "./grass";
import {GenerateCity} from "../cities/generate"

export function GenerateTerrain(
  ctx: CanvasRenderingContext2D,
  seed1: number,
  seed2: number,
  seed3: number,
  seed4: number
) {
  const width = 1280;
  const height = 720;
  const matrix: boolean[][] = [];

  function createMatrix() {
    for (let x = 0; x < width; x++) {
      matrix[x] = [];
      for (let y = 0; y < height; y++) {
        matrix[x][y] = false;
      }
    }
  }

  function getSeedMap(seed: number) {
    const s = String(seed).split("").map(Number);
    while (s.length < 12) s.push(1);
    return s;
  }


  function createIsland(x: number, y: number, seedMap: number[]) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;

    let grassCounter = 0;
    let noGrassCounter = 0;
    const determinant = seedMap[7];
    let doGrass = true;
    let doWater = false;

    Grass(ctx, x, y);
    matrix[x][y] = true;

    for (let variation = 0; variation < seedMap[4] * 20; variation++) {
      for (let xL = x - variation; xL <= x + variation; xL++) {
        for (let yL = y - variation; yL <= y + variation; yL++) {
          if (matrix[xL]?.[yL]) continue;

          if (xL > x && yL >= y - variation && yL < y + variation) {
            for (let position = xL; position >= x; position--) {
              if (position - 1 < 0) break;
              if (matrix[position - 1]?.[yL - 1] || matrix[position - 1]?.[yL + 1]) {
                if (grassCounter / determinant > 175) {
                  doGrass = false;
                  doWater = true;
                  grassCounter = 0;
                  continue;
                }
                if (noGrassCounter / determinant > 175) {
                  doWater = false;
                  doGrass = true;
                  noGrassCounter = 0;
                  continue;
                }
                if (doGrass) {
                  const dx = xL - x;
                  const dy = yL - y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  const radius = seedMap[6] * 20;

                  if (distance > radius) continue;

                  grassCounter++;
                  matrix[xL][yL] = true;
                  continue;
                }

                noGrassCounter++;
              }
            }
          }
        }
      }
    }

    // Buraco na direita (INALTERADO)
    let whereStart = 0;
    let whereFinish = 0;

    if (seedMap[4] > 0) {
      for (let index = seedMap[4] * 15 + x; index > x + seedMap[8] * 10; index--) {
        if (whereStart > seedMap[3] * 5) {
          for (let newLimit = 0; newLimit < 20; newLimit++)
            whereStart = seedMap[newLimit];
        }
        if (whereFinish > seedMap[9] * 5) {
          for (let newLimit = 0; newLimit < 20; newLimit++)
            whereFinish = seedMap[newLimit];
        }

        whereStart += 2;
        whereFinish += 1;

        for (let yIndex = y - whereStart * 3; yIndex < y + whereFinish * 3; yIndex++) {
          matrix[index][yIndex] = false;
        }
      }
    }

    for (let X = 0; X < width; X++) {
      for (let Y = 0; Y < height; Y++) {
        if (matrix[X][Y] === true) {
          Grass(ctx, X, Y);
        }
      }
    }
  }

  const s1 = getSeedMap(seed1);
  const s2 = getSeedMap(seed2);
  const s3 = getSeedMap(seed3);
  const s4 = getSeedMap(seed4);

  const islandQuantityDeterminant = s1[5];
  const firstPixelDeterminant = s1[10];

  createMatrix();

  if (islandQuantityDeterminant === 0 || islandQuantityDeterminant === 1) {
    if (firstPixelDeterminant <= 3) {
      createIsland(640, 360, s1);
      GenerateCity(ctx, matrix, 640 - s1[4] * 20, 640 + s1[4] * 20, 360 - s1[4] * 20, 360 + s1[4] * 20);
    } else if (firstPixelDeterminant <= 6) {
      createIsland(450, 360, s1);
      GenerateCity(ctx, matrix, 450 - s1[4] * 20, 450 + s1[4] * 20, 360 - s1[4] * 20, 360 + s1[4] * 20);
    } else {
      createIsland(830, 360, s1);
      GenerateCity(ctx, matrix, 830 - s1[4] * 20, 830 + s1[4] * 20, 360 - s1[4] * 20, 360 + s1[4] * 20);
    }
  } else if (islandQuantityDeterminant === 2) {
    createIsland(320, 360, s1);
    GenerateCity(ctx, matrix, 320 - s1[4] * 20, 320 + s1[4] * 20, 360 - s1[4] * 20, 360 + s1[4] * 20);
    createIsland(960, 360, s2);
    GenerateCity(ctx, matrix, 960 - s2[4] * 20, 960 + s2[4] * 20, 360 - s2[4] * 20, 360 + s2[4] * 20);
  } else if (islandQuantityDeterminant === 3) {
    createIsland(640, 180, s1);
    GenerateCity(ctx, matrix, 640 - s1[4] * 20, 640 + s1[4] * 20, 180 - s1[4] * 20, 180 + s1[4] * 20);
    createIsland(320, 540, s2);
    GenerateCity(ctx, matrix, 320 - s2[4] * 20, 320 + s2[4] * 20, 540 - s2[4] * 20, 540 + s2[4] * 20);
    createIsland(960, 540, s3);
    GenerateCity(ctx, matrix, 960 - s3[4] * 20, 960 + s3[4] * 20, 540 - s3[4] * 20, 540 + s3[4] * 20);
  } else {
    createIsland(320, 200, s1);
    GenerateCity(ctx, matrix, 320 - s1[4] * 20, 320 + s1[4] * 20, 200 - s1[4] * 20, 200 + s1[4] * 20);
    createIsland(960, 200, s2);
    GenerateCity(ctx, matrix, 960 - s2[4] * 20, 960 + s2[4] * 20, 200 - s2[4] * 20, 200 + s2[4] * 20);
    createIsland(320, 520, s3);
    GenerateCity(ctx, matrix, 320 - s3[4] * 20, 320 + s3[4] * 20, 520 - s3[4] * 20, 520 + s3[4] * 20);
  }
}
