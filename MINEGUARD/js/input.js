// MOUSE AND MENU NAVIGATION
function mousePressed() {

  if (gameState === "menu") {
    handleMenuClick();
    return;
  }

  if (gameState === "tutorial") {
    gameState = "menu";
    return;
  }

  // SETTINGS BUTTON
  if (mouseX >= 20 && mouseX <= 140 && mouseY >= 20 && mouseY <= 55) {
    settingsOpen = !settingsOpen;
    return;
  }

  // SETTINGS PANEL CLICKS
  if (settingsOpen) {
    let pw = 280;
    let ph = 200;
    let px = width / 2 - pw / 2;
    let py = height / 2 - ph / 2;
    let bw = 220;
    let bx = width / 2 - bw / 2;

    // Restart
    if (mouseX > bx && mouseX < bx + bw && mouseY > py + 68 && mouseY < py + 106) {
      startMode(cols, rows, mines, gameState);
      return;
    }

    // Main Menu
    if (mouseX > bx && mouseX < bx + bw && mouseY > py + 122 && mouseY < py + 160) {
      settingsOpen = false;
      gameState = "menu";
      return;
    }

    // Click outside closes panel
    if (mouseX < px || mouseX > px + pw || mouseY < py || mouseY > py + ph) {
      settingsOpen = false;
    }
    return;
  }

  // GAME OVER BUTTONS
  if (gameOver) {
    let cx = width / 2;
    let w = 180;
    let h = 40;
    let tryY = height / 2 + 60;
    let menuY = height / 2 + 115;

    if (mouseX > cx - w/2 && mouseX < cx + w/2 && mouseY > tryY - h/2 && mouseY < tryY + h/2) {
      startMode(cols, rows, mines, gameState);
      return;
    }
    if (mouseX > cx - w/2 && mouseX < cx + w/2 && mouseY > menuY - h/2 && mouseY < menuY + h/2) {
      gameState = "menu";
      gameOver = false;
      return;
    }
    return;
  }

  // TILE CLICK
  let x = floor((mouseX - startX) / tileSize);
  let y = floor((mouseY - startY) / tileSize);

  if (x < 0 || y < 0 || x >= cols || y >= rows) return;

  let t = grid[y][x];

  if (mouseButton === RIGHT) {
  if (!t.revealed) {
    if (t.flagged) {
      t.flagged = false; 
    } else if (mines - countFlags() > 0) {
      t.flagged = true; 
    }
   } 
   } else {
    reveal(x, y);
   }
 }

/* MENU CLICK HANDLER */
function handleMenuClick() {
  let cx = width / 2;
  let cy = height / 2;

  if (isHover(cx, cy - 30))  startMode(9, 9, 10, "easy");
  if (isHover(cx, cy + 20))  startMode(16, 16, 40, "medium");
  if (isHover(cx, cy + 70))  startMode(30, 16, 99, "hard");
  if (isHover(cx, cy + 130)) gameState = "tutorial";
}

/* HOVER HELPER */
function isHover(x, y) {
  let w = 200;
  let h = 42;

  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}