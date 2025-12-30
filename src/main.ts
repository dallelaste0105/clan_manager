import * as PIXI from "pixi.js";

(async()=>{
    const game = new PIXI.Application();
    await game.init({ background:'#1099bb', resizeTo:window });
    document.body.appendChild(game.canvas);

    const texture = await PIXI.Assets.load('/player.png');

    const square = new PIXI.Sprite(texture);

    square.anchor.set(0.5); 
    
    square.x = 400;
    square.y = 300;
    square.scale.set(4);
    
    game.stage.addChild(square);

    const keys = {
        w: false,
        a: false,
        s: false,
        d: false
    };

    window.addEventListener("keydown", (e) => {
        if (e.code === "KeyW") keys.w = true;
        if (e.code === "KeyA") keys.a = true;
        if (e.code === "KeyS") keys.s = true;
        if (e.code === "KeyD") keys.d = true;
    });

    window.addEventListener("keyup", (e) => {
        if (e.code === "KeyW") keys.w = false;
        if (e.code === "KeyA") keys.a = false;
        if (e.code === "KeyS") keys.s = false;
        if (e.code === "KeyD") keys.d = false;
    });

    game.ticker.add((time) => {
        const speed = 10;
        if (keys.w) {
            square.y -= speed;
        }
        if (keys.s) {
            square.y += speed;
        }
        if (keys.a) {
            square.x -= speed;
        }
        if (keys.d) {
            square.x += speed;
        }
    });
})();