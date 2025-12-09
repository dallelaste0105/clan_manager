export function House(ctx: CanvasRenderingContext2D, x: number, y: number) {

  // Corpo (cores mais suaves)
  ctx.fillStyle = "#e8dccb";  // bege pastel
  ctx.fillRect(x, y, 18, 12);

  // Contorno leve
  ctx.strokeStyle = "#00000033";
  ctx.lineWidth = 0.4;
  ctx.strokeRect(x, y, 18, 12);

  // Telhado reduzido
  ctx.fillStyle = "#b87a7a"; // vermelho suave, dessaturado
  ctx.beginPath();
  ctx.moveTo(x - 1, y);
  ctx.lineTo(x + 9, y - 6);   // pico do telhado
  ctx.lineTo(x + 19, y);
  ctx.closePath();
  ctx.fill();

  // Porta
  ctx.fillStyle = "#8c6a4d";  // marrom menos vivo
  ctx.fillRect(x + 7, y + 5, 4, 7);

  // Janelas (versão minúscula + azul suave)
  ctx.fillStyle = "#a7c7e7";
  ctx.fillRect(x + 3, y + 3, 3, 3);
  ctx.fillRect(x + 12, y + 3, 3, 3);
}
