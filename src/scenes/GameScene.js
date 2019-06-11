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
        const tiles = this.add.image(400, 300, 'tiles');
        const logo = this.add.image(400, 150, 'logo');
        
        this.tweens.add({
          targets: logo,
          y: 450,
          duration: 1000,
          ease: "Power2",
          yoyo: true,
          loop: -1
        });
    }
}
