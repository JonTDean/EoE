class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }

    create(){
        // Backest Background, typeOf::Background
        this.bg_1 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg");
        this.bg_1.setOrigin(0, 0); //set its pivot to top left corner
        this.bg_1.setScrollFactor(0); // Doesn't move with camera only on Update()

        // Background of Trees typeOf::Far_Focus
        this.bg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "trees_bg");
        this.bg_2.setOrigin(0, 0); //set its pivot to top left corner
        this.bg_2.setScrollFactor(0);

        // Background of Trees typeOf::Mid_Focus
        this.bg_3 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "trees_mg");
        this.bg_3.setOrigin(0, 0); //set its pivot to top left corner
        this.bg_3.setScrollFactor(0);

        // Background of Trees typeOf::Close_Focus
        this.bg_4 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "trees_fg");
        this.bg_4.setOrigin(0, 0); //set its pivot to top left corner
        this.bg_4.setScrollFactor(0);

        // Ground for the player to stand on
        this.ground = this.add.tileSprite(0, 0, game.config.width, 48, "ground");
        this.ground.setOrigin(0, 0);
        this.ground.setScrollFactor(0);
        // Position the tile at the bottom of the page
        this.ground.y = 24 * 14.7;

        // Player sprite
        this.player = this.add.sprite(game.config.width * 1.5, game.config.height / 2, "playerIdle");
        this.player.y = 24 * 13.45;
        // Create an animation for the player

        // this.anims.create({
        //     key: "fly",
        //     frames: this.anims.generateFrameNumbers("player"),
        //     frameRate: 20,
        //     repeat: -1
        // });

        // this.player.play("fly");

        // Idle Animation
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("playerIdle"),
            frameRate: 10,
            repeat: -1
        });

        // Running Animation
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("playerRun"),
            frameRate: 10,
            repeat: -1
        })
        
        // Jumping Animation
        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("playerJump"),
            frameRate: 10,
            repeat: -1
        })

        // allow key inputs to control the player
        this.cursors = this.input.keyboard.createCursorKeys();
    
        // set workd bounds to allow camera to follow the player
        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

        // making the camera follow the player
        this.myCam.startFollow(this.player);

    }

    update() {

        // move the player when the arrow keys are pressed
        if (this.cursors.left.isDown && this.player.x > 20) {
            this.player.x -= 3;       // Moves negatively across the X-axis
            this.player.flipX = true;   // Flips model to the left
            this.player.play("run", true);
                                                         // -20 to not pass the edge of map
        } else if (this.cursors.right.isDown && this.player.x < game.config.width * 3 - 20) {
            this.player.x += 3;       // Moves positively across the X-axis
            this.player.flipX = false;  // Flips model to the right
            this.player.play("run", true);

        } else if (this.cursors.up.isDown && this.player.y < game.config.height){
            this.player.y -= 3;     // Moves positively across the Y-axis
            this.player.scaleY = 1;
        
        } else {
            this.player.play("idle", true);
            // console.log(`X: ${this.player.x}|Y: ${this.player.y}`);
        }
    
        // scroll the texture of the tilesprites proportionally to the camera scroll
        this.bg_1.tilePositionX = this.myCam.scrollX * .1;
        this.bg_2.tilePositionX = this.myCam.scrollX * .2;
        this.bg_3.tilePositionX = this.myCam.scrollX * .3;
        this.bg_4.tilePositionX = this.myCam.scrollX * .5;
        this.ground.tilePositionX = this.myCam.scrollX;
    
    
    }
}