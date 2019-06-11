import 'phaser';
import logoImg from '../assets/logo.png';
import tilesImg from '../assets/classical_ruin_tiles.png';

export default class NextGameScene extends Phaser.Scene {
    constructor() {
        super('NextGame');
    }

    preload() {
        this.load.image('logo', logoImg);
        this.load.image('newtiles', tilesImg);

    }

    create() {
        this.tiles = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'newtiles');
        this.logo = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'logo');
        this.tiles.setScale(3, 3);
        this.text = this.add.text(0, 0, "Welcome to the next scene!", {font: "40px Impact"});
        
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
