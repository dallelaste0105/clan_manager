import * as PIXI from "pixi.js";//importa o PIXI

(async()=>{//deve ser uma operação assíncrona, pois deve esperar o PIXI carregar
    const game = new PIXI.Application();//carrega uma nova aplicação do PIXI
    await game.init({//Inicia a aplicação
        background:"#21b2bdb4",//define a cor de fundo
        resizeTo:window//define o tamanho da tela
    })
    const ws = new WebSocket('ws://localhost:3000');//cria a conexão enviando os cookies
    
    ws.addEventListener('open', () => {
            console.log("Conectado ao servidor WebSocket!");
        });
    
    let userId;
    ws.addEventListener("message", (event) => {
        const objetoRecebido = JSON.parse(event.data);
        userId = objetoRecebido.userId;
        playerEntered();
    })
    
    document.body.appendChild(game.canvas);//faz o corpo do documento receber como filho o canvas do jogo
    function playerEntered() {
        game.stage.addChild(player);
    }

    const sheet = await PIXI.Assets.load('/player.json');//carrega as texturas do jogador
    const player = new PIXI.AnimatedSprite(sheet.animations['down']);//aplica a animação de baixo no player
    
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 14,
        fontWeight: 'bold',
        fill: '#ffffff',
        stroke: '#000000',
    });
    const nameTag = new PIXI.Text({ text: userId, style });
    nameTag.anchor.set(0.5);
    nameTag.y = -40;
    player.addChild(nameTag);

    player.x = 500;
    player.y = 500;
    player.anchor.set(0.5);//define a posição de âncora (centro de massa) do jogador
    const velocity = 2;

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