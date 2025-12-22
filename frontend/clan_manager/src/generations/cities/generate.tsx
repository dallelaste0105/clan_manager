import { House } from "./house";
import { saveCity } from "../../connections/cities";

export function GenerateCity(
  ctx: CanvasRenderingContext2D,
  matriz: boolean[][],
  xMin: number,
  xMax: number,
  yMin: number,
  yMax: number,
  seed: number[],
  islandId: number
) {
  let citiesList: number[][] = [];
  
  const centerX = (xMin + xMax) / 2;
  const centerY = (yMin + yMax) / 2;
  const firstCitySize = (seed[4] || 1) * 3;

  const firstCity = [
    centerX - firstCitySize / 2,
    centerX + firstCitySize / 2,
    centerY - firstCitySize / 2,
    centerY + firstCitySize / 2
  ];

  citiesList.push(firstCity);

  for (let cX = Math.floor(firstCity[0]); cX < firstCity[1]; cX++) {
    for (let cY = Math.floor(firstCity[2]); cY < firstCity[3]; cY++) {
      if (matriz[cX] && matriz[cX][cY]) {
        House(ctx, cX, cY);
      }
    }
  }

  for (let index = 0; index < 20; index++) {
    const seedNumber = seed[index % seed.length] || 1;
    constructCity(seedNumber/3, (seedNumber + 1)/3);
  }

  function constructCity(citySize: number, maxHouses: number) {
    let built = 0;

    for (let islandX = xMin; islandX < xMax; islandX += 5) {
      for (let islandY = yMin; islandY < yMax; islandY += 5) {
        
        if (!matriz[Math.floor(islandX)] || !matriz[Math.floor(islandX)][Math.floor(islandY)]) continue;

        let collided = false;
        
        const cXMin = islandX - citySize / 2;
        const cXMax = islandX + citySize / 2;
        const cYMin = islandY - citySize / 2;
        const cYMax = islandY + citySize / 2;

        for (let city = 0; city < citiesList.length; city++) {
          if (cXMin <= citiesList[city][1] &&
              cXMax >= citiesList[city][0] &&
              cYMin <= citiesList[city][3] &&
              cYMax >= citiesList[city][2]) {
            collided = true;
            break;
          }
        }

        if (!collided) {
          citiesList.push([cXMin, cXMax, cYMin, cYMax]);
          saveCity(islandId, cXMin, cXMax, cYMin, cYMax);

          for (let cX = Math.floor(cXMin); cX < cXMax; cX++) {
            for (let cY = Math.floor(cYMin); cY < cYMax; cY++) {
              if (matriz[cX] && matriz[cX][cY]) {
                House(ctx, cX, cY);
                built++;
                if (built >= maxHouses) return;
              }
            }
          }
          return;
        }
      }
    }
  }
}
