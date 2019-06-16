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
        //this.logo = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'logo').setDepth(2);;
        
        this.text1 = this.add.text(1, 4, "Welcome to the next scene!", {font: "40px Impact"}).setDepth(4);
	    this.text2 = this.add.text(4, 1, "Welcome to the next scene!", {font: "40px Impact"}).setDepth(5);	
	    this.text1.setColor('black');
        this.text2.setColor('white');

        this.level = this.add.tilemap('level0');
        this.tileset = this.level.addTilesetImage('mario_tiles', 'mario_tiles');
        this.layerBackground = this.level.createStaticLayer('Background', this.tileset).setScale(3, 3).setDepth(1);
        // this.layerHills = this.level.createStaticLayer('Hills', this.tileset).setScale(3, 3).setDepth(2);
        // this.layerClouds = this.level.createStaticLayer('Clouds', this.tileset).setScale(3, 3).setDepth(3);
        this.layerForeground = this.level.createStaticLayer('Foreground', this.tileset).setScale(3, 3).setDepth(4);
        this.layerItems = this.level.createDynamicLayer('Items', this.tileset).setScale(3, 3).setDepth(5);
        this.layerItems.setTileIndexCallback([11, 12, 18, 19], (sprite, tile) => {
            //console.log(`Sprite: ${sprite}, Tile: ${tile}`);
            this.layerItems.removeTileAt(tile.x, tile.y);
            return false;
        }, this);

        this.physics.world.bounds.width = this.layerForeground.width;
        this.physics.world.bounds.height = this.layerForeground.height;

        this.otherlevel = this.add.tilemap('otherlevel');
        this.othertileset = this.otherlevel.addTilesetImage('other', 'other');
        this.otherlayer = this.otherlevel.createStaticLayer('Foreground',this.othertileset).setScale(0.5, 0.5).setDepth(6).setAlpha(0);

        this.knight1 = this.physics.add.sprite(100, 500, 'knight').setScale(1, 1).setDepth(4);
	    this.knight1.setBounce(0.1);
        this.layerForeground.setCollisionByExclusion([-1]);
	    this.physics.add.collider(this.knight1, this.layerForeground);
        this.physics.add.overlap(this.knight1, this.layerItems);

        this.cameras.main.setBounds(0, 0, this.level.widthInPixels * 4, this.level.heightInPixels * 4);
        //this.knight1.setBounds(0, 0, this.level.widthInPixels * 4, this.level.heightInPixels * 4);
        this.cameraDolly = new Phaser.Geom.Point(Math.floor(this.knight1.x), Math.floor(this.knight1.y));
        this.cameras.main.startFollow(this.cameraDolly, true, 1.0, 1.0, 0.0, 0.5);
        this.cameras.main.setBackgroundColor('#ccccff');
        
        this.anims.create({
            key: 'knightwalk',
            repeat: -1,
	    yoyo: 0,
            frameRate: 15,
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
        // this.PositionX = 0;
        // this.PositionY = 0;

        // this.tweens.add({
        //   targets: this.logo,
        //   y: 200,
        //   duration: 2000,
        //   ease: "Power2",
        //   yoyo: true,
        //   loop: -1
        // });

        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.input.on('pointerdown', (e) => {
	        if (this.knight1.body.onFloor()) {
                this.knight1.setVelocityY(-500);
                this.frameCount = 0;
	        }
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
        // var jumping = false;

        if (this.keyLeft.isDown == true) {
            //this.PositionX--;
            this.knight1.setVelocityX(-100);
            this.frameCount = 0
            this.knight1.scaleX = -1;
            moving = true;
        }
        if (this.keyRight.isDown == true) {
            //this.PositionX++;
            this.knight1.setVelocityX(100);
            this.frameCount = 0
            this.knight1.scaleX = 1;
            moving = true;
        }
        // if (this.keyUp.isDown == true) {
        //     this.PositionY--;
        //     this.frameCount = 0
        //     moving = false;
        //     jumping = true;
        // }
        // if (this.keyDown.isDown == true) {
        //     this.PositionY++;
        //     this.frameCount = 0
        //     moving = false;
        //     jumping = true;
        // }
    
        if (this.frameCount > 90) {
            //this.PositionX++;
            this.knight1.setVelocityX(100);
            this.knight1.scaleX = 1;
            moving = true;
	    }

        // this.layerHills.setPosition(-this.PositionX >> 1, -1200 + (this.PositionY >> 1));
        // this.layerClouds.setPosition(-this.PositionX, -1200 + this.PositionY);
        // this.layerForeground.setPosition(-this.PositionX << 1, -1200 + (this.PositionY << 1));
        // this.layerGrass.setPosition(-this.PositionX << 1, -1200 + (this.PositionY << 1));

        // this.otherlayer.setPosition(-this.PositionX << 2, 0);
        // console.log(`Knight anim : ${this.knight1.anims.currentAnim.key}`);
 
        if ((moving === true) && (this.knight1.anims.currentAnim.key != 'knightwalk')) {
            this.knight1.play('knightwalk');
        }
        if (moving === false) {
            this.knight1.setVelocityX(0);

            if (this.knight1.anims.currentAnim.key === 'knightwalk') {
                this.knight1.play('knightidle');
            }
        }
        // if ((jumping === true) && (this.this.knight1.anims.currentAnim.key != 'knightjump')) {
            // this.this.knight1.play('knightjump');
        // }
        // if ((moving === false) && (jumping === false) && (this.this.knight1.anims.currentAnim.key != 'knightidle')) {
            // this.this.knight1.play('knightidle');
        // }

        // this.cameras.main.scrollX = this.knight1.x - 800;
        // this.cameras.main.scrollY = this.knight1.y - 600;

        this.cameraDolly.x = Math.floor(this.knight1.x);
        this.cameraDolly.y = Math.floor(this.knight1.y) - 256;
    }
}
