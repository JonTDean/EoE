class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }

    create(){
        this.physics.world.setBounds(game.config.width, game.config.height)

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

        // Castle Gate 
        this.castle_back = this.add.tileSprite(0, 0, 0, 0, "gate_back");
        this.castle_back.setOrigin(0, 0);
        this.castle_back.displayHeight = game.config.height;
        this.castle_back.y = -60;

        this.castle_front = this.add.tileSprite(0, 0, 0, 0, "gate_front");
        this.castle_front.setOrigin(0, 0);
        this.castle_front.displayHeight = game.config.height;
        this.castle_front.y = -60;
        this.castle_front.depth = 2

        // Ground for the player to stand on
        this.ground = this.physics.add.sprite(0, game.config.height *.95, "ground_full");
        // this.physics.add.existing(this.ground); // Add the ground tiles as a physics object.
        this.ground.setImmovable(true);
        this.ground.displayWidth = game.config.width * 3
        this.ground.setOrigin(0, 0);
        this.ground.setSize(this.ground.width, 160);
        // this.ground.setScrollFactor(0);
        // Position the tile at the bottom of the page
        this.ground.y = 24 * 12;

        //Portal Sprite
        this.portal = this.physics.add.sprite(0, 0, "portal_open");
        this.portal.setImmovable(true);
        this.portal.setOrigin(0, 0);
        this.portal.displayHeight = game.config.height;
        this.portal.displayWidth = 128;
        this.portal.x = 2300;
        this.portal.y = -50;

        // Player sprite
        this.player = this.physics.add.sprite(game.config.width * 1.5, game.config.height / 2, "playerIdle");
        this.player.setSize(40, 106, true);
        this.player.setGravityY(150);
        // this.player.x = 75;
        this.player.x = 1900;

        // ENEMIES
        this.skeleton = this.physics.add.sprite(2250, 200, 'skeletonIdle');
        this.skeleton.setSize(65, 56, true)
        this.skeleton.setGravityY(100);

        // Set a collider between the player and the ground
        // this.physics.add.collider(this.player, this.ground, collideObjects, null, this);
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.portal);
        this.physics.add.collider(this.skeleton, this.ground);
        this.physics.add.collider(this.skeleton, this.portal);
        this.physics.add.collider(this.skeleton, this.player);
        // Check for player/enemy body collision
        this.isColliding = false;
        this.physics.add.overlap(this.player, this.skeleton, function(){
            this.isColliding = true;
        })

        // Animations
        // Player
        // Idle Animation
        this.anims.create({
            key: "playerIdle",
            frames: this.anims.generateFrameNumbers("playerIdle"),
            frameRate: 10,
            repeat: -1
        });

        // Running Animation
        this.anims.create({
            key: "playerRun",
            frames: this.anims.generateFrameNumbers("playerRun"),
            frameRate: 20,
            repeat: -1
        })
        
        // Jumping Animation
        this.anims.create({
            key: "playerJump",
            frames: this.anims.generateFrameNumbers("playerJump"),
            frameRate: 10,
            repeat: -1
        })

        // Falling Animation
        this.anims.create({
            key: "playerFall",
            frames: this.anims.generateFrameNumbers("playerFall"),
            frameRate: 10,
            repeat: -1
        })

        // Enemies
        // Skeleton
        // Skeleton Idle Animation
        this.anims.create({
            key: "skeletonIdle",
            frames: this.anims.generateFrameNumbers("skeletonIdle"),
            frameRate: 8,
            repeat: -1
        })
        this.anims.create({
            key: "skeletonWalk",
            frames: this.anims.generateFrameNumbers("skeletonWalk"),
            frameRate: 8,
            repeat: -1
        })

        // Environment 
        // Portal
        // Portal Opened Animation
        this.anims.create({
            key: "opened",
            frames: this.anims.generateFrameNumbers("portal_open"),
            frameRate: 10,
            repeat: -1
        });

        // Persistent Animation Area
        // Portal Animation start
        this.portal.play("opened");


           
        // Camera Stuff For Parallax
        // allow key inputs to control the player
        this.cursors = this.input.keyboard.createCursorKeys();
    
        // set workd bounds to allow camera to follow the player
        this.myCam = this.cameras.main;
        this.myCam.setBounds(0, 0, game.config.width * 3, game.config.height);

        // making the camera follow the player
        this.myCam.startFollow(this.player);

    }

    update() {
        // console.log(this.player.body.touching);
        let touching = this.player.body.touching;
        let skeletonTouching = this.skeleton.body.touching;
        let playerSeeking = function(x, enemy){
            enemy.setVelocityX = x            
        }

        // move the player when the arrow keys are pressed
        if (this.cursors.left.isDown && !touching.left) {
            this.player.setVelocityX(-190);       // Moves negatively across the X-axis
            this.player.flipX = true;   // Flips model to the left
            this.player.play("playerRun", true);
            if (this.player.x < 50){
                this.player.setVelocityX(0);
            }
            if (this.cursors.up.isDown && touching.down){
                this.player.play("playerJump", true)
                this.player.setVelocityY(-140);     // Moves positively across the Y-axis
            }else if (!touching.down){
                this.player.play("playerJump", true)
                if (this.player.body.velocity.y > 0){
                    this.player.play("playerFall", true)
                }
                // console.log(this.player.body.velocity.y)
            }
                                                                         // - 20 to not pass the edge of map
        } else if (this.cursors.right.isDown && this.player.x < game.config.width * 3 - 20 && !touching.right) {
            this.player.setVelocityX(190);       // Moves positively across the X-axis
            this.player.flipX = false;  // Flips model to the right
            this.player.play("playerRun", true);
            if (this.player.x >  game.config.width * 3 - 40){
                this.player.setVelocityX(0);
            }

            if (this.cursors.up.isDown && touching.down){
                this.player.play("playerJump", true)
                this.player.setVelocityY(-180);     // Moves positively across the Y-axis
            } else if (!touching.down){
                this.player.play("playerJump", true)
                if (this.player.body.velocity.y > 0){
                    this.player.play("playerFall", true)
                }
                // console.log(this.player.body.velocity.y)

            }

        } else if (this.cursors.up.isDown && touching.down){
            this.player.setVelocityY(-140);     // Moves positively across the Y-axis
        
        } else if (!touching.down){
            this.player.play("playerJump", true)
            if (this.player.body.velocity.y > 0){
                this.player.play("playerFall", true)
            }
            // console.log(this.player.body.velocity.y)

        } else {
            this.player.play("playerIdle", true);
            this.player.setVelocityX(0);
            // console.log(`X: ${this.player.x}|Y: ${this.player.y}`);
        }

        // if (touching.left || touching.right){
        //     this.player.setVelocityX(0);
        //     this.player.setVelocityY(0);
        // }

        // Enemy logic
        // use (this.skeleton.x - this.player.x <= 70) for attack range
        if (this.skeleton.x - this.player.x <= 200){       
            if(this.skeleton.x < this.player.x){
                this.skeleton.play("skeletonWalk", true);
                this.skeleton.setVelocityX(100);
                this.skeleton.flipX = false;
            }else if(this.skeleton.x > this.player.x){
                this.skeleton.play("skeletonWalk", true);
                this.skeleton.setVelocityX(-100);
                this.skeleton.flipX = true;   
            }
            // console.log(this.skeleton.x)
        }else{
            this.skeleton.setVelocityX(0) 
            this.skeleton.play("skeletonIdle", true);
        }

        if(this.isColliding && skeletonTouching){
            this.skeleton.setVelocityX(0)
        }
    
        // scroll the texture of the tilesprites proportionally to the camera scroll
        this.bg_1.tilePositionX = this.myCam.scrollX * .1;
        this.bg_2.tilePositionX = this.myCam.scrollX * .2;
        this.bg_3.tilePositionX = this.myCam.scrollX * .3;
        this.bg_4.tilePositionX = this.myCam.scrollX * .5;
        this.ground.tilePositionX = this.myCam.scrollX;
    
    
    }
}