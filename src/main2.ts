import * as PIXI from "pixi.js";

(async()=>{
    const game = new PIXI.Application();
    await game.init({
        background:"#ffffff",
        resizeTo:window
    })
    document.body.appendChild(game.canvas);

    const texture = await PIXI.Assets.load("/player.png");
    const player = new PIXI.Sprite(texture);

    player.x = 500;
    player.y = 500;
    player.anchor.set(0.5);
    const velocity = 5;
    
    game.stage.addChild(player);

    let keys = {a:false, s:false, d:false, w:false};

    document.addEventListener("keydown", (e)=>{
        switch (e.code) {
            case "KeyA":
                keys.a = true;
                break;
            case "KeyS":
                keys.s = true;
                break;
            case "KeyD":
                keys.d = true;
                break;
            case "KeyW":
                keys.w = true;
                break;
        }
    })

    document.addEventListener("keyup", (e)=>{
        switch (e.code) {
            case "KeyA":
                keys.a = false;
                break;
            case "KeyS":
                keys.s = false;
                break;
            case "KeyD":
                keys.d = false;
                break;
            case "KeyW":
                keys.w = false;
                break;
        }
    })

    game.ticker.add((time)=>{
        if (keys.a) {
            player.x -= velocity;
        }
        if (keys.s) {
            player.y += velocity;
        }
        if (keys.d) {
            player.x += velocity;
        }
        if (keys.w) {
            player.y -= velocity;
        }
    })
})();