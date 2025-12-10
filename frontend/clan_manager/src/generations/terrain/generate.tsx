import { Grass } from "./grass";

export function GenerateTerrain(ctx: CanvasRenderingContext2D, seed: number) {
  const width = 1280;
  const height = 720;
  const matrix: boolean[][] = [];
  const hasGrass: number[][] = [];                   

    //-----constrói a matriz
  for (let x = 0; x < width; x++) {
    matrix[x] = [];                       
    for (let y = 0; y < height; y++) {
      matrix[x][y] = false;
    }
    //-----passa sobre cada membro dela novamente
    for (let x2 = 0; x2 < width; x2++) {                      
        for (let y2 = 0; y2 < height; y2++) {

            //------passa somente sobre a linha da matriz
            for (let iX = 0; x2 < width; iX++) {  
                if (matrix[x2][y2]) {
                    hasGrass[0][iX];//------recebe a posição x de onde tem terra
                }
                //------passa somente sobre a coluna da matriz
                for (let iY = 0; y2 < height; iY++) {
                    if (matrix[x2][y2]) {
                    hasGrass[0][iY];//-----recebe a posição y de onde tem terra
                }
                if ((hasGrass[0] && hasGrass[0])) {
                    
                }
                else{
                    Grass(ctx, x2, y2);
                }
                }   
            }
        }
  }
}
}