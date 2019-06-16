import 'phaser';
import marioTilesImg from '../assets/mario_tiles_extruded.png';
import level0JSON from '../assets/maps/level0.json';
import knightImg from '../assets/sprites/knight.png';
import knightJSON from '../assets/sprites/knight.json';

export default class NextGameScene extends Phaser.Scene {
    constructor() {
        super('NextGameScene');
    }

    preload() {
        this.load.tilemapTiledJSON('level0', level0JSON);
        this.load.image('mario_tiles', marioTilesImg);
        this.load.atlas('knight', knightImg, knightJSON);
    }

    create() {
        this.knightAutoMoveSpeed = 100;

        this.level = this.add.tilemap('level0');
        this.tileset = this.level.addTilesetImage('mario_tiles', 'mario_tiles');
        this.layerBackground = this.level.createStaticLayer('Background', this.tileset).setScale(4, 4).setDepth(1);
        this.layerForeground = this.level.createStaticLayer('Foreground', this.tileset).setScale(4, 4).setDepth(4);
        this.layerItems = this.level.createDynamicLayer('Items', this.tileset).setScale(4, 4).setDepth(5);
        this.layerItems.setTileIndexCallback([11, 12, 18, 19], (sprite, tile) => {
            console.log(`${tile.index},${tile.x},${tile.y}`);
            if ((tile.index === 12) || (tile.index === 18)) {
                // console.log('Flip sprite!');
                // this.knightAutoMoveSpeed = - this.knightAutoMoveSpeed;
            }
            this.layerItems.removeTileAt(tile.x, tile.y);
            return false;
        }, this);

        this.physics.world.bounds.width = this.layerForeground.width;
        this.physics.world.bounds.height = this.layerForeground.height;

        this.knight1 = this.physics.add.sprite(100, 500, 'knight').setDepth(4);
        this.knight1.setBounce(0.1);
        this.knight1.body.setSize(40, 72);
        this.layerForeground.setCollisionByExclusion([-1]);
	    this.physics.add.collider(this.knight1, this.layerForeground);
        this.physics.add.overlap(this.knight1, this.layerItems);

        this.cameras.main.setBounds(0, 0, this.level.widthInPixels * 4, this.level.heightInPixels * 4);
        this.cameraDolly = new Phaser.Geom.Point(Math.floor(this.knight1.x), Math.floor(this.knight1.y));
        this.cameras.main.startFollow(this.knight1, false, 0.1, 0.1, 0.0, 0.0);
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
            frameRate: 15,
            frames: this.anims.generateFrameNames('knight', {
                prefix: 'Idle (',
                suffix: ').png',
                start: 1,
                end: 10,
            })
        });
        this.anims.create({
            key: 'knightjump',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNames('knight', {
                prefix: 'Jump (',
                suffix: ').png',
                start: 1,
                end: 10,
            })
        });

        this.knight1.play('knightidle');

        this.frameCount = 0;

        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.input.on('pointerdown', (e) => {
	        if (this.knight1.body.onFloor()) {
                this.knight1.setVelocityY(-550);
                this.knight1.play('knightjump');
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

        if (this.keyLeft.isDown == true) {
            this.knight1.setVelocityX(-100);
            this.frameCount = 0
            //this.knight1.scaleX = -1.0;
            this.knight1.setFlipX(true);
            moving = true;
        }
        if (this.keyRight.isDown == true) {
            this.knight1.setVelocityX(100);
            this.frameCount = 0
            // this.knight1.scaleX = 1.0;
            this.knight1.setFlipX(false);
            moving = true;
        }
        if (this.frameCount > 90) {
            this.knight1.setVelocityX(this.knightAutoMoveSpeed);
            // this.knight1.scaleX = 1.0;
            this.knight1.setFlipX(false);
            moving = true;
	    }

        if ((moving === true) && (this.knight1.anims.currentAnim.key != 'knightwalk') && this.knight1.body.onFloor()) {
            this.knight1.play('knightwalk');
        }
        if (moving === false) {
            this.knight1.setVelocityX(0);

            if (this.knight1.anims.currentAnim.key === 'knightwalk') {
                this.knight1.play('knightidle');
            }
        }
        this.cameraDolly.x = Math.floor(this.knight1.x);
        this.cameraDolly.y = Math.floor(this.knight1.y);
    }
}
