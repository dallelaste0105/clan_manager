import * as PIXI from "pixi.js";

(async()=>{
    const game = new PIXI.Application();
    await game.init({
        background:"#21b2bdb4",
        resizeTo:window
    })
    document.body.appendChild(game.canvas);

    const texture = await PIXI.Assets.load("/player.png");

    /* const runHorizontal = await Promise.all([
    PIXI.Assets.load("/rh1.png"),
    PIXI.Assets.load("/rh2.png"),
    PIXI.Assets.load("/rh3.png"),
    PIXI.Assets.load("/rh4.png"),
    PIXI.Assets.load("/rh5.png"),
    PIXI.Assets.load("/rh6.png"),
    PIXI.Assets.load("/rh7.png"),
    PIXI.Assets.load("/rh8.png"),
    PIXI.Assets.load("/rh9.png"),
    PIXI.Assets.load("/rh10.png"),
    PIXI.Assets.load("/rh11.png"),
    PIXI.Assets.load("/rh12.png"),
    PIXI.Assets.load("/rh13.png"),
    PIXI.Assets.load("/rh14.png"),
    PIXI.Assets.load("/rh15.png"),
    PIXI.Assets.load("/rh16.png"),
    PIXI.Assets.load("/rh17.png"),
    PIXI.Assets.load("/rh18.png"),
    PIXI.Assets.load("/rh19.png"),
    PIXI.Assets.load("/rh20.png"),
    PIXI.Assets.load("/rh21.png"),
    PIXI.Assets.load("/rh22.png"),
    PIXI.Assets.load("/rh23.png"),
    PIXI.Assets.load("/rh24.png"),
]);

    const moveVertical = await Promise.all([
    PIXI.Assets.load("/rv1.png"),
    PIXI.Assets.load("/rv2.png"),
    PIXI.Assets.load("/rv3.png"),
    PIXI.Assets.load("/rv4.png"),
    PIXI.Assets.load("/rv5.png"),
    PIXI.Assets.load("/rv6.png"),
    PIXI.Assets.load("/rv7.png"),
    PIXI.Assets.load("/rv8.png"),
    PIXI.Assets.load("/rv9.png"),
    PIXI.Assets.load("/rv10.png"),
    PIXI.Assets.load("/rv11.png"),
    PIXI.Assets.load("/rv12.png"),
    PIXI.Assets.load("/rv13.png"),
    PIXI.Assets.load("/rv14.png"),
    PIXI.Assets.load("/rv15.png"),
    PIXI.Assets.load("/rv16.png"),
    PIXI.Assets.load("/rv17.png"),
    PIXI.Assets.load("/rv18.png"),
    PIXI.Assets.load("/rv19.png"),
    PIXI.Assets.load("/rv20.png"),
    PIXI.Assets.load("/rv21.png"),
    PIXI.Assets.load("/rv22.png"),
    PIXI.Assets.load("/rv23.png"),
    PIXI.Assets.load("/rv24.png"),
]); */

    const player = new PIXI.Sprite(texture);

    const blurFilter = new PIXI.BlurFilter();
    blurFilter.strength = 0;

    const trailContainer = new PIXI.Container();
    game.stage.addChild(trailContainer);
    game.stage.addChild(player);

    player.filters = [blurFilter];

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
            blurFilter.strength = 10
        }
        if (keys.s) {
            player.y += velocity;
            blurFilter.strength = 10
        }
        if (keys.d) {
            player.x += velocity;
            blurFilter.strength = 10
        }
        if (keys.w) {
            player.y -= velocity;
            blurFilter.strength = 10
        }
        if(keys.a == false && keys.s == false && keys.d == false && keys.w == false){
            blurFilter.strength = 0
        }
    })
})();