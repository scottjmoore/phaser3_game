import 'phaser';
import logoImg from '../assets/logo.png';
import tilesImg from '../assets/dawn_of_the_gods.png';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image('logo', logoImg);
        this.load.image('tiles', tilesImg);
    }

    create() {
        this.tiles = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'tiles');
        this.logo = this.add.image(0, 0, 'logo');
        this.text = this.add.text(0, 0, "Welcome to the scene!", {font: "40px Impact"});
        this.text.setColor('yellow');

        this.tweens.add({
          targets: this.logo,
          x: window.innerWidth,
          y: window.innerHeight,
          duration: 5000,
          ease: "Power2",
          easeParams: [2.0, 0.25],
          delay: 1000,
          yoyo: true,
          loop: -1
        });

        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.input.on('pointerdown', (e) => {
            const physicsImg = this.physics.add.image(e.x, e.y, 'logo');

            physicsImg.setVelocity(Phaser.Math.RND.integerInRange(-300, 300), -200);
        }, this);

        this.input.keyboard.on('keyup', (e) => {
            if (e.key == '2') {
                this.scene.start('NextGame');
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
