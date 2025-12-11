import { House } from "../cities/house";
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
        //supondo que x=450 e y=360
        //---------------matriz---------------------
        //(450, 360) (451, 360) (452, 360) (453, 360) (454, 360) (455, 360)

        //(450, 361) (451, 361) (452, 361) (453, 361) (454, 361) (455, 361)

        //(450, 362) (451, 362) (452 K 362) (453, 362) (454, 362) (455, 362)

        //(450, 363) (451, 363) (452, 363) (453, 363) (454, 363) (455, 363)

        //(450, 364) (451, 364) (452, 364) (453, 364) (454, 364) (455, 364)

        //(450, 365) (451, 365) (452, 365) (453, 365) (454, 365) (455, 365)
        //------------------------------------------
    

    function createIsland(x: number, y: number) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    
    for (let variation = 0; variation<(seedMap[4]*15); variation++) {
        for (let xL = x-variation; xL <= (x+variation); xL++) {
          for (let yL = y-variation; yL <= (y+variation); yL++){
            if (matrix[xL][yL]) {
              continue;
            }

            //--area to apply imperfections to the island--

            if (xL > x && (yL >= y - variation && yL < y + variation)) {
                // right
            }
            else if (xL < x && (yL >= y - variation && yL < y + variation)) {
                // left
            }
            else if (yL < y && (xL >= x - variation && xL < x + variation)) {
                // up
            }
            else if (yL > y && (xL >= x - variation && xL < x + variation)) {
                // down
            }
            
            //--area to apply imperfections to the island--
            Grass(ctx, xL, yL);
            matrix[xL][yL] = true;
          }
        }
      }
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