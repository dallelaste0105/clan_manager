import * as PIXI from "pixi.js";

class PlayerModel {
    playerId: number;
    x: number;
    y: number;
    game: PIXI.Application;
    sheet!: PIXI.Spritesheet; 
    player!: PIXI.AnimatedSprite;
    velocity: number = 5;

    public constructor(playerId: number, x: number, y: number, game: PIXI.Application) {
        this.playerId = playerId;
        this.x = x;
        this.y = y;
        this.game = game;
    }

    public async loadAssets(): Promise<void> {
        this.sheet = await PIXI.Assets.load('/player.json');
        this.player = new PIXI.AnimatedSprite(this.sheet.animations['down']);
        this.player.x = this.x;
        this.player.y = this.y;
        this.player.anchor.set(0.5);
    }

    public walk(key: string): void {
        if (!this.player) return;
        switch (key) {
            case "KeyA":
                this.x -= this.velocity;
                this.player.x = this.x; 
                this.player.textures = this.sheet.animations['left'];
                break;
            case "KeyS":
                this.y += this.velocity;
                this.player.y = this.y; 
                this.player.textures = this.sheet.animations['down'];
                break;
            case "KeyD":
                this.x += this.velocity;
                this.player.x = this.x; 
                this.player.textures = this.sheet.animations['right'];
                break;
            case "KeyW":
                this.y -= this.velocity;
                this.player.y = this.y; 
                this.player.textures = this.sheet.animations['up'];
                break;
        }
    }

    public drawItSelf(): void {
        if (this.player) {
            this.game.stage.addChild(this.player);
        }
    }

    public killItSelf(): void {
        if (this.player) {
            this.game.stage.removeChild(this.player);
        }
    }
}

export default PlayerModel;