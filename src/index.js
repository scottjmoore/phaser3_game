import Phaser from 'phaser';
import config from './config/config';
import GameScene from './scenes/GameScene';
import NextGameScene from './scenes/NextGameScene';

class Game extends Phaser.Game {
	constructor() {
		super(config);
		
		this.scene.add('Game', GameScene);
		this.scene.add('NextGameScene', NextGameScene);
		this.scene.start('NextGameScene');
	}
}

window.onload = function () {
	window.game = new Game();
}