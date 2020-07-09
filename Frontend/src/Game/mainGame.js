let game;

// Loads up the game data
window.onload = function(){
    let gameConfig = {
        type: Phaser.CANVAS,
        width: 800,
        height: 400,
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                debug: true,
                gravity: {
                    y: 0
                }
            }
        },
        scene: [preloadGame, playGame],
        parent: document.querySelector('div#mainDiv')// Appends Container to Canvas
    }
    
    game = new Phaser.Game(gameConfig);
}