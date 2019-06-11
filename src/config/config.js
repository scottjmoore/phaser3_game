export default {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 200}
        }
    }
  };