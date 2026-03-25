/* MENU */
function drawMenu() {
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  let cx = width / 2;
  let cy = height / 2;

  fill(45);
  rect(cx, cy, 360, 320, 12);

  fill(255);
  textSize(32);
  text("MineGuard", cx, cy - 110);

  drawButton("Easy", cx, cy - 30);
  drawButton("Medium", cx, cy + 20);
  drawButton("Hard", cx, cy + 70);
  drawButton("HOW TO PLAY", cx, cy + 130);
}

function drawButton(label, x, y) {
  let w = 200;
  let h = 42;

  let hover =
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2;

  fill(hover ? 90 : 65);
  rect(x, y, w, h, 6);

  fill(255);
  textSize(18);
  text(label, x, y);
}

/* TUTORIAL */
function drawTutorial() {
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  fill(30, 230);
  rect(width / 2, height / 2, 600, 420, 12);

  fill(255);
  textSize(28);
  text("HOW TO PLAY", width / 2, height / 2 - 150);

  textSize(18);
  text("• Left click = Reveal tile", width / 2, height / 2 - 60);
  text("• Right click = Place flag", width / 2, height / 2 - 30);
  text("• Numbers show nearby mines", width / 2, height / 2);
  text("• Avoid all mines to win", width / 2, height / 2 + 30);

  text("💣 = Mine", width / 2, height / 2 + 80);
  text("🚩 = Flag", width / 2, height / 2 + 110);

  drawBackToMenuButton();
}

function drawBackToMenuButton() {
  let x = width / 2;
  let y = height / 2 + 170;
  let w = 200;
  let h = 40;

  fill(90);
  rect(x, y, w, h, 8);

  fill(255);
  textSize(16);
  text("BACK TO MENU", x, y);
}

/* GAME DRAW */
function drawGame() {
  drawHeader();
  drawSettingsButton();
  drawGrid();

  if (!gameOver) {
    elapsedTime = floor((millis() - startTime) / 1000);
  }

  // Top info row: Time | Flags | Mines
  let flagsPlaced = countFlags();
  let remainingFlags = mines - flagsPlaced;

  fill(255);
  textSize(15);
  textAlign(CENTER, CENTER);

  text("Time: " + elapsedTime + "s", width / 2, 68);
  text("🚩 " + remainingFlags + " left", width / 2 - 120, 68);
  text("💣 " + mines + " mines", width / 2 + 120, 68);

  // Win count row
  textSize(13);
  fill(180);
  text(
    "Wins:  Easy " + wins.easy + "  |  Medium " + wins.medium + "  |  Hard " + wins.hard,
    width / 2, 90
  );

  if (gameOver) {
    fill(0, 180);
    rect(0, 0, width, height);

    fill(win ? color(255, 255, 255) : color(220, 50, 50));
    textSize(48);
    text(win ? "YOU WIN" : "GAME OVER", width / 2, height / 2);

    drawGameOverButtons();
  }

  // settings panel on top
  if (settingsOpen) {
    drawSettingsPanel();
  }
}

/* HEADER */
function drawHeader() {
  fill(255);
  textSize(26);
  textAlign(CENTER, CENTER);

  let title =
    gameState === "easy" ? "EASY (9 X 9)" :
    gameState === "medium" ? "MEDIUM (16 X 16)" :
    gameState === "hard" ? "HARD (30 X 16)" : "";

  text(title, width / 2, 30);
}

/* SETTINGS BUTTON */
function drawSettingsButton() {
  let x = 20;
  let y = 20;
  let w = 120;
  let h = 35;

  let hover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

  fill(hover ? 110 : 80);
  rect(x, y, w, h, 8);

  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  text("SETTINGS", x + w / 2, y + h / 2);
}

/* SETTINGS PANEL */
function drawSettingsPanel() {
  let pw = 280;
  let ph = 200;
  let px = width / 2 - pw / 2;
  let py = height / 2 - ph / 2;

  let bw = 220;
  let bx = width / 2 - bw / 2;

  let restartHover = mouseX > bx && mouseX < bx + bw && mouseY > py + 68 && mouseY < py + 106;
  let menuHover    = mouseX > bx && mouseX < bx + bw && mouseY > py + 122 && mouseY < py + 160;

  rectMode(CORNER);

  fill(0, 160);
  rect(0, 0, width, height);

  fill(45);
  rect(px, py, pw, ph, 12);

  fill(65);
  rect(px, py, pw, 46, 12, 12, 0, 0);

  fill(255);
  textSize(17);
  textAlign(CENTER, CENTER);
  text("SETTINGS", width / 2, py + 23);

  stroke(80);
  line(px + 16, py + 46, px + pw - 16, py + 46);
  noStroke();

  fill(restartHover ? 100 : 70);
  rect(bx, py + 68, bw, 38, 8);
  fill(255);
  textSize(15);
  textAlign(CENTER, CENTER);
  text("RESTART", width / 2, py + 87);

  fill(menuHover ? 100 : 70);
  rect(bx, py + 122, bw, 38, 8);
  fill(255);
  textSize(15);
  text("MAIN MENU", width / 2, py + 141);
}

/* GAME OVER BUTTONS */
function drawGameOverButtons() {
  let cx = width / 2;
  let tryY = height / 2 + 60;
  let menuY = height / 2 + 115;
  let w = 180;
  let h = 40;

  rectMode(CENTER);

  let hoverTry = mouseX > cx - w/2 && mouseX < cx + w/2 && mouseY > tryY - h/2 && mouseY < tryY + h/2;
  fill(hoverTry ? 130 : 90);
  rect(cx, tryY, w, h, 8);
  fill(255);
  textSize(18);
  textAlign(CENTER, CENTER);
  text("TRY AGAIN", cx, tryY);

  let hoverMenu = mouseX > cx - w/2 && mouseX < cx + w/2 && mouseY > menuY - h/2 && mouseY < menuY + h/2;
  fill(hoverMenu ? 130 : 90);
  rect(cx, menuY, w, h, 8);
  fill(255);
  textSize(18);
  text("MAIN MENU", cx, menuY);
}

/* GRID */
function drawGrid() {
  stroke(140);
  textAlign(CENTER, CENTER);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {

      let t = grid[y][x];
      let px = startX + x * tileSize;
      let py = startY + y * tileSize;

      fill(t.revealed ? 50 : 85);
      rect(px, py, tileSize, tileSize);

      if (t.revealed && t.mine) {
        textSize(tileSize * 0.6);
        text("💣", px + tileSize / 2, py + tileSize / 2);
      }

      if (t.flagged) {
        textSize(tileSize * 0.6);
        text("🚩", px + tileSize / 2, py + tileSize / 2);
      }

      if (t.revealed && t.count > 0 && !t.mine) {
        fill(255);
        textSize(tileSize * 0.45);
        text(t.count, px + tileSize / 2, py + tileSize / 2);
      }
    }
  }
}