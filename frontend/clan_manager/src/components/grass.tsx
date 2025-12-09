export const Grass = {
  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.fillStyle = "#3cb043";
    ctx.fillRect(x, y, 1, 1);
  }
};