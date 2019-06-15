import 'phaser';
import logoImg from '../assets/logo.png';
import marioTilesImg from '../assets/mario_tiles.png';
import ballImg from '../assets/ball-sprite.18x18.png';
import tokiImg from '../assets/toki.0.0.png';
import level0JSON from '../assets/maps/level0.json';

export default class NextGameScene extends Phaser.Scene {
    constructor() {
        super('NextGameScene');

    }

    preload() {
        this.load.image('logo', logoImg);
        this.load.image('ball', ballImg);
        this.load.image('toki', tokiImg);
        this.load.tilemapTiledJSON('level0', level0JSON);
        this.load.image('mario_tiles', marioTilesImg);
    }

    create() {
        this.logo = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'logo').setDepth(2);;
        
        this.text1 = this.add.text(1, 4, "Welcome to the next scene!", {font: "40px Impact"}).setDepth(4);
	    this.text2 = this.add.text(4, 1, "Welcome to the next scene!", {font: "40px Impact"}).setDepth(5);	
	    this.text1.setColor('black');
        this.text2.setColor('white');

        this.level = this.add.tilemap('level0');
        this.tileset = this.level.addTilesetImage('mario_tiles', 'mario_tiles');
        this.layerBackground = this.level.createStaticLayer('Background', this.tileset).setScale(4, 4);
        this.layerHills = this.level.createStaticLayer('Hills', this.tileset).setScale(4, 4);
        this.layerClouds = this.level.createStaticLayer('Clouds', this.tileset).setScale(4, 4);
        this.layerForeground = this.level.createStaticLayer('Foreground', this.tileset).setScale(4, 4);
        this.layerGrass = this.level.createStaticLayer('Grass', this.tileset).setScale(4, 4);

        this.frameCount = 0;
        this.PositionX = 0;
        this.PositionY = 0;

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
            const physicsImg = this.physics.add.sprite(e.x, e.y, Phaser.Math.RND.integerInRange(0, 1) ? 'ball' : 'toki');
            physicsImg.setScale(Phaser.Math.RND.integerInRange(3, 5));
            physicsImg.setAngularVelocity(Phaser.Math.RND.integerInRange(-180, 180));
            physicsImg.setCollideWorldBounds(true, true, true);
            physicsImg.setVelocity(Phaser.Math.RND.integerInRange(-300, 300), 200);
            physicsImg.setDepth(Phaser.Math.RND.integerInRange(1, 10));
        }, this);

        this.input.keyboard.on('keyup', (e) => {
            if (e.key == '1') {
                this.scene.start('Game');
            }
        }, this);
    }

    update(delta) {
        this.frameCount++;

        if (this.keyLeft.isDown == true) {
            this.PositionX--;
		this.frameCount = 0
        }
        if (this.keyRight.isDown == true) {
            this.PositionX++;
        }
        if (this.keyUp.isDown == true) {
            this.PositionY--;
        }
        if (this.keyDown.isDown == true) {
            this.PositionY++;
        }
	if (this.frameCount > 90) {
		this.PositionX++;
	}

        this.layerHills.setPosition(-this.PositionX >> 1, -1200 + (this.PositionY >> 1));
        this.layerClouds.setPosition(-this.PositionX, -1200 + this.PositionY);
        this.layerForeground.setPosition(-this.PositionX << 1, -1200 + (this.PositionY << 1));
        this.layerGrass.setPosition(-this.PositionX << 1, -1200 + (this.PositionY << 1));
    }
}
