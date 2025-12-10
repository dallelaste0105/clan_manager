import { Grass } from "./grass";

export function GenerateTerrain(ctx: CanvasRenderingContext2D, seed: number) {
  const width = 1280;
  const height = 720;
  const matrix: boolean[][] = [];
  const seedMap = String(seed).split('').map(Number);

  for (let x = 0; x < width; x++) {
    matrix[x] = [];
    for (let y = 0; y < height; y++) {
      matrix[x][y] = false;
    }
  }

  function createIsland(x: number, y: number) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    matrix[x][y] = true;
    Grass(ctx, x, y);
    //looping para criação das ilhas aqui!!!
  }

  const islandQuantityDeterminant = seedMap[5];
  const firstPixelDeterminant = seedMap[10];

  if (islandQuantityDeterminant === 0 || islandQuantityDeterminant === 1) {
    if (firstPixelDeterminant <= 3) {
      createIsland(640, 360);
    } 
    else if (firstPixelDeterminant >= 4 && firstPixelDeterminant <= 6) {
      createIsland(450, 360);
    } 
    else {
      createIsland(830, 360);
    }
  }
  else if (islandQuantityDeterminant === 2) {
    if (firstPixelDeterminant <= 5) {
      createIsland(320, 360);
      createIsland(960, 360);
    } 
    else {
      createIsland(300, 200);
      createIsland(980, 520);
    }
  }
  else if (islandQuantityDeterminant === 3) {
    createIsland(640, 180);
    createIsland(320, 540);
    createIsland(960, 540);
  }
  else {
    createIsland(320, 200);
    createIsland(960, 200);
    createIsland(320, 520);
    createIsland(960, 520);
  }
}