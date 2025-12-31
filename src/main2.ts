import * as PIXI from "pixi.js";

(async()=>{
    const game = new PIXI.Application();
    await game.init({
        background:"#21b2bdb4",
        resizeTo:window
    })
    document.body.appendChild(game.canvas);

    const sheet = await PIXI.Assets.load('/player.json');

    const player = new PIXI.AnimatedSprite(sheet.animations['down']);

    const blurFilter = new PIXI.BlurFilter();
    blurFilter.strength = 0;

    const trailContainer = new PIXI.Container();
    game.stage.addChild(trailContainer);
    game.stage.addChild(player);

    player.filters = [blurFilter];

    player.x = 500;
    player.y = 500;
    player.anchor.set(0.5);
    const velocity = 2;
    
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



    game.ticker.add(() => {
        let isMoving = false;

        if (keys.w) {
            player.y -= velocity;
            isMoving = true;
            if (player.textures !== sheet.animations['up']) {
                player.textures = sheet.animations['up'];
                player.play();
            }
        }
        else if (keys.s) {
            player.y += velocity;
            isMoving = true;
            if (player.textures !== sheet.animations['down']) {
                player.textures = sheet.animations['down'];
                player.play();
            }
        }
        else if (keys.a) {
            player.x -= velocity;
            isMoving = true;
            if (player.textures !== sheet.animations['left']) {
                player.textures = sheet.animations['left'];
                player.play();
            }
        }
        else if (keys.d) {
            player.x += velocity;
            isMoving = true;
            if (player.textures !== sheet.animations['right']) {
                player.textures = sheet.animations['right'];
                player.play();
            }
        }

        if (!isMoving) {
            player.stop();
            player.currentFrame = 0;
        } else {
            if (!player.playing) player.play();
        }
    });
})();