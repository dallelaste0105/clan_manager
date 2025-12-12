import { House } from "./house";

export function GenerateCity(ctx:CanvasRenderingContext2D, matriz:boolean[][], xMin:number, xMax:number, yMin:number, yMax:number) {
    
    for (let islandX = 0; islandX < xMax; islandX++) {
        for (let islandY = 0; islandY < yMax; islandY++) {
            if (matriz[islandX][islandY]) {
                House(ctx, islandX, islandY);
        }
        }
    }
}