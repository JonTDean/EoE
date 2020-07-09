class preloadGame extends Phaser.Scene{
    constructor(){
        super("PreloadGame");
    }

    preload(){
        // Handles Image Loading
        // NOTE FOR LATER:
        // The paths have to be loaded relative to their location 
        // not from the js file but from the HTML file.
        this.load.image("bg", "assets/demon_woods/bg.png");
        this.load.image("trees_bg", "assets/demon_woods/demon_trees_bg.png");
        this.load.image("trees_mg", "assets/demon_woods/demon_trees_mg.png");
        this.load.image("trees_fg","assets/demon_woods/demon_trees_fg.png");
        this.load.image("ground", "assets/demon_woods/ground_demon.png")
        this.load.image("ground_full", "assets/demon_woods/ground_demon_full.png")

        // Handles SpriteSheet Loading
        // Player Idle
        this.load.spritesheet("playerIdle","assets/warrior_sprites/idle.png",{
            frameWidth:160,
            frameHeight:106
        });
        
        // Player Run
        this.load.spritesheet("playerRun","assets/warrior_sprites/Run.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Player Attack 1
        this.load.spritesheet("playerAttack1","assets/warrior_sprites/Attack1.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Player Attack 2
        this.load.spritesheet("playerAttack2","assets/warrior_sprites/Attack2.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Player Attack 3
        this.load.spritesheet("playerAttack3","assets/warrior_sprites/Attack3.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Player Jump
        this.load.spritesheet("playerJump","assets/warrior_sprites/Jump.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Player Fall
        this.load.spritesheet("playerFall","assets/warrior_sprites/Fall.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Player Get Hit Silhouette
        this.load.spritesheet("playerHit","assets/warrior_sprites/Take_Hit_Silhouette.png",{
            frameWidth:160,
            frameHeight:106
        });
        
        // Player Death
        this.load.spritesheet("playerDeath","assets/warrior_sprites/Death.png",{
            frameWidth:160,
            frameHeight:106
        });

        // Player 
    }

    create(){
        this.scene.start("PlayGame");
    }
}