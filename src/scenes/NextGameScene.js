import 'phaser';
import logoImg from '../assets/logo.png';
import tilesImg from '../assets/classical_ruin_tiles.png';
import marioTilesImg from '../assets/mario_tiles.png';

export default class NextGameScene extends Phaser.Scene {
    constructor() {
        super('NextGame');

    }


    preload() {
        this.load.image('logo', logoImg);
        this.load.image('newtiles', tilesImg);
        this.load.image('mariotiles', marioTilesImg);
    }

    create() {
        this.logo = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'logo');
        this.text = this.add.text(0, 0, "Welcome to the next scene!", {font: "40px Impact"});
        this.text.setColor('red');

        const levelFront = [
            [  -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1 ],
            [ -1,   1,   2,   3,   -1,   -1,   -1,   1,   2,   3,   -1 ],
            [  -1,   5,   6,   7,   -1,   -1,   -1,   5,   6,   7,   -1 ],
            [ -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1 ],
            [  -1,   -1,   -1,  14,  13,  14,   -1,   -1,   -1,   -1,   -1 ],
            [ -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1 ],
            [  -1,   -1,   -1,   -1,   11,   -1,   -1,   -1,   -1,   -1,   -1 ],
            [ -1,   -1,  14,  14,  14,  14,  14,   -1,   -1,   -1,  15 ],
            [  -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,  15,  15 ],
            [ 35,  36,  37,   -1,   -1,   -1,   -1,   -1,  15,  15,  15 ],
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
            [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ]
        ];

        const mapFront = this.make.tilemap({ data: levelFront, tileWidth: 16, tileHeight: 16 });
        const mapBack = this.make.tilemap({ data: levelBack, tileWidth: 16, tileHeight: 16 });
        const marioTilesFront = mapFront.addTilesetImage('mariotiles');
        const marioTilesBack = mapBack.addTilesetImage('mariotiles');
        const layerBack = mapBack.createStaticLayer(0, marioTilesBack, 0, 0).setScale(4, 4).setDepth(-1);
        const layerFront = mapFront.createStaticLayer(0, marioTilesFront, 0, 0).setScale(4, 4).setDepth(1);

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
            const physicsImg = this.physics.add.image(e.x, e.y, 'logo');

            physicsImg.setVelocity(Phaser.Math.RND.integerInRange(-300, 300), 200);
        }, this);

        this.input.keyboard.on('keyup', (e) => {
            if (e.key == '1') {
                this.scene.start('Game');
            }
        }, this);
    }

    update(delta) {
        if (this.keyLeft.isDown) {
            this.tiles.x--;
        }

        if (this.keyRight.isDown) {
            this.tiles.x++;
        }
        if (this.keyUp.isDown) {
            this.tiles.y--;
        }

        if (this.keyDown.isDown) {
            this.tiles.y++;
        }
    }
}
