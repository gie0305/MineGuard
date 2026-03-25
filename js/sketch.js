// SETUP AND DRAW LOOP
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('background', 'transparent');
  document.oncontextmenu = () => false;
}

function draw() {
  clear();

  if (gameState !== "menu") {
    rectMode(CORNER);
    fill(0, 100);
    rect(0, 0, width, height);
  }

  if (gameState === "menu") drawMenu();
  else if (gameState === "tutorial") drawTutorial();
  else drawGame();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (gameState !== "menu" && gameState !== "tutorial") {
    calculateLayout();
  }
}