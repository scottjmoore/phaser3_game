import 'phaser';
import logoImg from '../assets/logo.png';
import tilesImg from '../assets/dawn_of_the_gods.png'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('logo', logoImg);
        this.load.image('tiles', tilesImg);
    }

    create() {
        this.tiles = this.add.image(400, 300, 'tiles');
        this.logo = this.add.image(400, 150, 'logo');
        
        this.tweens.add({
          targets: this.logo,
          y: 450,
          duration: 1000,
          ease: "Power2",
          yoyo: true,
          loop: -1
        });

        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.input.on('pointerdown', (e) => {
            this.tiles.x = e.x;
            this.tiles.y = e.y;
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
