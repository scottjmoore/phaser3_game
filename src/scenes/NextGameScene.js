import 'phaser';
import logoImg from '../assets/logo.png';
import marioTilesImg from '../assets/mario_tiles.png';
import ballImg from '../assets/ball-sprite.18x18.png';
import tokiImg from '../assets/toki.0.0.png';
import level0JSON from '../assets/maps/level0.json';
import otherlevelJSON from '../assets/maps/other.json';
import otherlevelImg from '../assets/maps/other.png';
import knightImg from '../assets/sprites/knight.png';
import knightJSON from '../assets/sprites/knight.json';

export default class NextGameScene extends Phaser.Scene {
    constructor() {
        super('NextGameScene');
    }

    preload() {
        this.load.image('logo', logoImg);
        this.load.image('ball', ballImg);
        this.load.image('toki', tokiImg);
        this.load.tilemapTiledJSON('level0', level0JSON);
        this.load.tilemapTiledJSON('otherlevel', otherlevelJSON);
        this.load.image('mario_tiles', marioTilesImg);
        this.load.image('other', otherlevelImg);
        this.load.atlas('knight', knightImg, knightJSON);
    }

    create() {
        this.logo = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'logo').setDepth(2);;
        
        this.text1 = this.add.text(1, 4, "Welcome to the next scene!", {font: "40px Impact"}).setDepth(4);
	    this.text2 = this.add.text(4, 1, "Welcome to the next scene!", {font: "40px Impact"}).setDepth(5);	
	    this.text1.setColor('black');
        this.text2.setColor('white');

        this.level = this.add.tilemap('level0');
        this.tileset = this.level.addTilesetImage('mario_tiles', 'mario_tiles');
        this.layerBackground = this.level.createStaticLayer('Background', this.tileset).setScale(4, 4).setDepth(1);
        this.layerHills = this.level.createStaticLayer('Hills', this.tileset).setScale(4, 4).setDepth(2);
        this.layerClouds = this.level.createStaticLayer('Clouds', this.tileset).setScale(4, 4).setDepth(3);
        this.layerForeground = this.level.createStaticLayer('Foreground', this.tileset).setScale(4, 4).setDepth(4);
        this.layerGrass = this.level.createStaticLayer('Grass', this.tileset).setScale(4, 4).setDepth(5);

        this.otherlevel = this.add.tilemap('otherlevel');
        this.othertileset = this.otherlevel.addTilesetImage('other', 'other');
        this.otherlayer = this.otherlevel.createStaticLayer('Foreground',this.othertileset).setScale(0.5, 0.5).setDepth(6).setAlpha(1.0);

        this.knight1 = this.physics.add.sprite(100, 100, 'knight').setScale(2, 2).setDepth(4);
	this.knight1.setCollideWorldBounds(true);
	this.layerForeground.setCollisionByExclusion([-1]);
	this.physics.add.collider(this.knight1, this.layerForeground);
        // const knight2 = this.add.sprite(150, 100, 'knight');

        this.anims.create({
            key: 'knightwalk',
            repeat: -1,
	    yoyo: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('knight', {
                prefix: 'Walk (',
                suffix: ').png',
                start: 1,
                end: 10,
            })
        });
        this.anims.create({
            key: 'knightidle',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('knight', {
                prefix: 'Idle (',
                suffix: ').png',
                start: 1,
                end: 10,
            })
        });
        this.anims.create({
            key: 'knightjump',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('knight', {
                prefix: 'Jump (',
                suffix: ').png',
                start: 1,
                end: 10,
            })
        });

        this.knight1.play('knightidle');
        // knight2.play('knightidle');

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

        var moving = false;
        var jumping = false;

        if (this.keyLeft.isDown == true) {
            this.PositionX--;
            this.frameCount = 0
            this.knight1.scaleX = -2;
            moving = true;
        }
        if (this.keyRight.isDown == true) {
            this.PositionX++;
            this.frameCount = 0
            this.knight1.scaleX = 2;
            moving = true;
        }
        if (this.keyUp.isDown == true) {
            this.PositionY--;
            this.frameCount = 0
            moving = false;
            jumping = true;
        }
        if (this.keyDown.isDown == true) {
            this.PositionY++;
            this.frameCount = 0
            moving = false;
            jumping = true;
        }
    
        if (this.frameCount > 90) {
            this.PositionX++;
            this.knight1.scaleX = 2;
            moving = true;
	    }

        this.layerHills.setPosition(-this.PositionX >> 1, -1200 + (this.PositionY >> 1));
        this.layerClouds.setPosition(-this.PositionX, -1200 + this.PositionY);
        this.layerForeground.setPosition(-this.PositionX << 1, -1200 + (this.PositionY << 1));
        this.layerGrass.setPosition(-this.PositionX << 1, -1200 + (this.PositionY << 1));

        this.otherlayer.setPosition(-this.PositionX << 2, 0);
        // console.log(`Knight anim : ${this.knight1.anims.currentAnim.key}`);
 
        if ((moving === true) && (this.knight1.anims.currentAnim.key != 'knightwalk')) {
            this.knight1.play('knightwalk');
        }
        if ((jumping === true) && (this.knight1.anims.currentAnim.key != 'knightjump')) {
            this.knight1.play('knightjump');
        }
        if ((moving === false) && (jumping === false) && (this.knight1.anims.currentAnim.key != 'knightidle')) {
            this.knight1.play('knightidle');
        }
    }
}
