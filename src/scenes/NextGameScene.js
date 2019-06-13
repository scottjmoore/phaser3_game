import 'phaser';
import logoImg from '../assets/logo.png';
import marioTilesImg from '../assets/mario_tiles.png';
import ballImg from '../assets/ball-sprite.18x18.png';

export default class NextGameScene extends Phaser.Scene {
    constructor() {
        super('NextGameScene');

    }

    preload() {
        this.load.image('logo', logoImg);
        this.load.image('mariotiles', marioTilesImg);
        this.load.image('ball', ballImg);
    }

    create() {
        this.logo = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'logo').setDepth(2);;
        this.text = this.add.text(0, 0, "Welcome to the next scene!", {font: "40px Impact"}).setDepth(4);
	
	this.text.setColor('black');
        this.frameCount = 0;

        const levelFront = [
            [  -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1 ],
            [ -1,   1,   2,   3,   -1,   -1,   -1,   1,   2,   3,   -1 ],
            [  -1,   5,   6,   7,   -1,   -1,   -1,   5,   6,   7,   -1 ],
            [ -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1 ],
            [  -1,   -1,   -1,  14,  13,  14,   -1,   -1,   -1,   -1,   -1 ],
            [ -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1 ],
            [  -1,   -1,   -1,   18,   11,   18,   -1,   -1,   -1,   -1,   -1 ],
            [ -1,   -1,  14,  14,  14,  14,  14,   -1,   -1,   -1,  15 ],
            [  -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,  15,  15 ],
            [ 35,  36,  37,   -1,   -1,   -1,   -1,   -1,  15,  15,  15 ],
            [ 39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39 ],
            [ 40,  40,  40,  40,  40,  40,  40,  40,  40,  40,  40 ],
            [ 39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39 ],
            [ 39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39 ]
        ];

        const levelBack = [
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ]
        ];

        const mapFront = this.make.tilemap({ data: levelFront, tileWidth: 16, tileHeight: 16 });
        const mapBack = this.make.tilemap({ data: levelBack, tileWidth: 16, tileHeight: 16 });
        const marioTilesFront = mapFront.addTilesetImage('mariotiles');
        const marioTilesBack = mapBack.addTilesetImage('mariotiles');
        const layerBack = mapBack.createStaticLayer(0, marioTilesBack, 0, 0).setScale(4, 4).setDepth(1);
        this.layerFront = mapFront.createDynamicLayer(0, marioTilesFront, 0, 0).setScale(4, 4).setDepth(3);
        
        this.tweens.add({
          targets: this.logo,
          y: 200,
          duration: 2000,
          ease: "Power2",
          yoyo: true,
          loop: -1
        });

        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.input.on('pointerdown', (e) => {
            const physicsImg = this.physics.add.sprite(e.x, e.y, 'ball').setDepth(Phaser.Math.RND.integerInRange(2, 4));
            physicsImg.setScale(Phaser.Math.RND.integerInRange(3, 5));
            physicsImg.setAngularVelocity(Phaser.Math.RND.integerInRange(-180, 180));
            physicsImg.setCollideWorldBounds(true, true, true);
            physicsImg.setVelocity(Phaser.Math.RND.integerInRange(-300, 300), 200);
        }, this);

        this.input.keyboard.on('keyup', (e) => {
            if (e.key == '1') {
                this.scene.start('Game');
            }
        }, this);
    }

    update(delta) {
        this.frameCount++;

        if ((this.frameCount % 30) === 0) {
            const animTile = this.layerFront.tilemap.layers[0].data[4][4];
            animTile.index++;

            if (animTile.index > 40) animTile.index = -1;
        }
    }
}
