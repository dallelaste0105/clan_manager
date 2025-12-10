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

    const islandQuantityDeterminant = seedMap[5];
    const firstPixelDeterminant = seedMap[10];
    let firstIslandPixel: number[][] = []; 

if (islandQuantityDeterminant === 0 || islandQuantityDeterminant === 1) {
    if (firstPixelDeterminant <= 3) {
        firstIslandPixel.push([640, 360]); 
    } 
    else if (firstPixelDeterminant >= 4 && firstPixelDeterminant <= 6) {
        firstIslandPixel.push([450, 360]);
    } 
    else {
        firstIslandPixel.push([830, 360]);
    }
}

else if (islandQuantityDeterminant === 2) {
    if (firstPixelDeterminant <= 5) {
        firstIslandPixel.push([320, 360]); 
        firstIslandPixel.push([960, 360]); 
    } 
    else {
        firstIslandPixel.push([300, 200]); 
        firstIslandPixel.push([980, 520]); 
    }
}

else if (islandQuantityDeterminant === 3) {
    firstIslandPixel.push([640, 180]); 
    firstIslandPixel.push([320, 540]);
    firstIslandPixel.push([960, 540]);
}

else {
    firstIslandPixel.push([320, 200]);
    firstIslandPixel.push([960, 200]);
    firstIslandPixel.push([320, 520]);
    firstIslandPixel.push([960, 520]); 
}
}