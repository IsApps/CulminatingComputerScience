let objects = [];
let currentType = 'flower';
let gameState = 'welcome'; // Initializing the Welcome Screen
let startButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50, 200, 50); // Green BG for Greass

  // Create a start button
  startButton = createButton('Start Zen Garden');
  startButton.position(width / 2 - 50, height / 2);
  startButton.mousePressed(startGame);
}

function draw() {
  if (gameState === 'welcome') { // Setting the Game State
    drawWelcomeScreen();
  } else if (gameState === 'playing') { // If the player chooses to play the game
    background(50, 200, 50);

    for (let i = 0; i < objects.length; i++) {
      animateObject(objects[i]);
      drawObject(objects[i]);
    }
  }
}

function drawWelcomeScreen() {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text('Welcome to Zen Garden', width / 2, height / 3);
  textSize(16);
  text('Click the button below to start creating your garden', width / 2, height / 2.5);
}

function startGame() {
  gameState = 'playing';
  startButton.hide();
}

function drawObject(obj) { // Setting the object to be drawn
  if (obj.type === 'flower') {
    drawFlower(obj.x, obj.y, obj.animationOffset);
  } else if (obj.type === 'stone') {
    drawStone(obj.x, obj.y, obj.animationOffset);
  } else if (obj.type === 'water') {
    drawWater(obj.x, obj.y, obj.animationOffset);
  }
}

function animateObject(obj) { // Animating the object
  obj.animationOffset += 0.05;
  if (obj.animationOffset > TWO_PI) { // Setting the Animation Offset
    obj.animationOffset -= TWO_PI;
  }
}

function drawFlower(x, y, offset) {
  let size = 20 + 5 * sin(offset); // Animate size with sine wave
  stroke(255, 0, 0, 150); // Red with transparency
  strokeWeight(2);
  fill(255, 0, 0, 150);

  ellipse(x, y, size, size); // Flower center
  ellipse(x - 10, y - 10, 10, 10); // Petals
  ellipse(x + 10, y - 10, 10, 10);
  ellipse(x - 10, y + 10, 10, 10);
  ellipse(x + 10, y + 10, 10, 10);
}

function drawStone(x, y, offset) {
  let size = 30 + 5 * sin(offset); // Animate size with sine wave
  stroke(150, 150, 150, 150); // Grey with transparency
  strokeWeight(2);
  fill(150, 150, 150, 150);

  ellipse(x, y, size, size / 1.5); // Stone shape
}

function drawWater(x, y, offset) {
  let size = 40 + 10 * sin(offset); // Animate size with sine wave
  stroke(0, 0, 255, 100); // Blue with transparency
  strokeWeight(2);
  fill(0, 0, 255, 100);

  ellipse(x, y, size, size / 2); // Water shape
}

function mousePressed() { // Setting what to do if mouse pressed
  if (gameState === 'playing') {
    let obj = { x: mouseX, y: mouseY, type: currentType, animationOffset: random(TWO_PI) };
    objects.push(obj);
  }
}

function keyPressed() { // Changing between different types
  if (gameState === 'playing') {
    if (key === 'f') {
      currentType = 'flower';
    } else if (key === 's') {
      currentType = 'stone';
    } else if (key === 'w') {
      currentType = 'water';
    }
  }
}
