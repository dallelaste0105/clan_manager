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
        //(450, 359) (451, 359) (452, 359) (453, 359) (454, 359) k(455, 359)

        //(450, 360) (451, 360) (452, 360) (453, 360) k(454, 360) k(455, 360)

        //(450, 361) (451, 361) (452, 361) k(453, 361) k(454, 361) k(455, 361)

        //(450, 362) (451, 362) (452 K 362) k(453, 362) k(454, 362) k(455, 362)

        //(450, 363) (451, 363) (452, 363) k(453, 363) k(454, 363) k(455, 363)

        //(450, 364) (451, 364) (452, 364) (453, 364) k(454, 364) k(455, 364)

        //(450, 365) (451, 365) (452, 365) (453, 365) (454, 365) k(455, 365)
        //------------------------------------------
    

    function createIsland(x: number, y: number) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;

    let grassCounter = 0;
    let noGrassCounter = 0;
    const determinant = seedMap[7];
    let doGrass = true;
    let doWater = false;

    Grass(ctx, x, y);
    matrix[x][y] = true;
    
    for (let variation = 0; variation<(seedMap[4]*15); variation++) {
        for (let xL = x-variation; xL <= (x+variation); xL++) {
          for (let yL = y-variation; yL <= (y+variation); yL++){

            if (matrix[xL][yL]) {
              continue;
            }

            if (xL > x && (yL >= y - variation && yL < y + variation)) {
                
                for (let position = xL; position>=x; position--) {
                  if (position - 1 < 0) break;
                  if (matrix[position-1][yL-1] === true || matrix[position-1][yL+1] === true) {
                    if ((grassCounter/determinant)>175) {
                      doGrass = false;
                      doWater = true;
                      grassCounter=0;
                      continue;
                    }
                    if ((noGrassCounter/determinant)>175) {
                      doWater = false;
                      doGrass = true;
                      noGrassCounter=0;
                      continue;
                    }
                    if (doGrass) {
                      const dx = xL - x;
                      const dy = yL - y;
                      const distance = Math.sqrt(dx*dx + dy*dy);

                      const radius = seedMap[6] * 20;

                      if (distance > radius) {
                        continue;
                      }
                      
                      grassCounter++;
                      matrix[xL][yL] = true;
                      continue;
                    }
                    noGrassCounter+=1;
                  }
                }
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
            
          }
        }
      }

      //buraco na direita começo
      let whereStart = 0;
      let whereFinish = 0;
      if (seedMap[4]>0) {
        for (let index=seedMap[4]*15+x;index>x+(seedMap[8]*10);index--) {
          if (whereStart>seedMap[3]*5) {
            for (let newLimit = 0; newLimit < 20; newLimit++) {
              whereStart=seedMap[newLimit];
            }
          }
          if (whereFinish>seedMap[9]*5) {
            for (let newLimit = 0; newLimit < 20; newLimit++) {
              whereFinish=seedMap[newLimit];
            }
          }
          whereStart+=2;
          whereFinish+=1;
          
            for (let yIndex = y-whereStart*3; yIndex< y+whereFinish*3; yIndex++) { 
                matrix[index][yIndex] = false;
          }
        }
      }
      //buraco na direita final

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          if (matrix[x][y] === true) {
            Grass(ctx, x, y);
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