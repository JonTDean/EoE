// Finds Container for Canvas
const canvasContainer = document.getElementById('canvasContainer');
//Grabs the background Images.
const background = './src/assets/Temple.png';
let forestBG = [
    './src/assets/Forest/Layer_0000_9.png',
    './src/assets/Forest/Layer_0001_8.png',
    './src/assets/Forest/Layer_0002_7.png',
    './src/assets/Forest/Layer_0003_6.png',
    './src/assets/Forest/Layer_0004_Lights.png',
    './src/assets/Forest/Layer_0005_5.png',
    './src/assets/Forest/Layer_0006_4.png',
    './src/assets/Forest/Layer_0007_Lights.png',
    './src/assets/Forest/Layer_0008_3.png',
    './src/assets/Forest/Layer_0009_2.png',
    './src/assets/Forest/Layer_0010_1.png'
]


// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
let app = new PIXI.Application({
    width: 800,
    height: 600,
    antialias: true, 
    transparent: false, 
    resolution: 1
});

// Add the canvas to the pixi application
canvasContainer.appendChild(app.view);

// Load the images in cache
PIXI.loader
    .add(background)
    .load(setup);

// Display the images from cache
function setup() {
    // Create the background
    let bg = new PIXI.Sprite(PIXI.loader.resources[background].texture);
    bg.width = 800;
    bg.scale.y = .8;
    // Add the image to the stage
    app.stage.addChild(bg);
}



