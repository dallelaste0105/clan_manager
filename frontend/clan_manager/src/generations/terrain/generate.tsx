import { Grass } from "./grass";

export function GenerateTerrain(ctx: CanvasRenderingContext2D, seed: number) {
  const width = 1280;
  const height = 720;
  const matrix: boolean[][] = [];

  for (let x = 0; x < width; x++) {
    matrix[x] = [];                       
    for (let y = 0; y < height; y++) {
      matrix[x][y] = true;
      if (Math.random() < 0.3) {
        matrix[x][y] = false;
      }
      if (matrix[x][y]) {
        Grass(ctx, x, y);
      }    
    }
  }
}
