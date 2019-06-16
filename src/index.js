import Phaser from 'phaser';
import config from './config/config';
import NextGameScene from './scenes/NextGameScene';

class Game extends Phaser.Game {
	constructor() {
		super(config);
		
		this.scene.add('NextGameScene', NextGameScene);
		this.scene.start('NextGameScene');
	}
}

window.onload = function () {
	window.game = new Game();
}