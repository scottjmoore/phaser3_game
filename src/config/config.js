export default {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: window.innerWidth,
    height: window.innerHeight,
    pixelArt: true,
    roundPixels: true,
    /*scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },*/
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: {y: 500}
        }
    }
  };
