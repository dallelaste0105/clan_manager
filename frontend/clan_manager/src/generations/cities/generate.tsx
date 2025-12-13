import { House } from "./house";

export function GenerateCity(
  ctx: CanvasRenderingContext2D,
  matriz: boolean[][],
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  seed: number[]
) {


    //-------beginning of the logic of house construction------
  const maxHouses = seed[7] * 3;
  let built = 0;
    
    for (let islandX = xMin; islandX < xMax; islandX++) {
        for (let index = 0; index < seed.length; index++) {
            for (let islandY = yMin; islandY < yMax; islandY++) {
                if (matriz[islandX][islandY]) {
                    House(ctx, islandX+seed[index], islandY+seed[index]);
                    built++;

                    if (built >= maxHouses) {
                    return;
                    }
                }
            }
        }
    }

    //------end of the logic of house construction-------
}
