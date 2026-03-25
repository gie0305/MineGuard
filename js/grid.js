// GAME LOGIC AND GRID MANAGEMENT
/* GAME START */
function startMode(c, r, m, mode) {
  cols = c;
  rows = r;
  mines = m;
  gameState = mode;
  gameOver = false;
  win = false;
  settingsOpen = false;

  startTime = millis();

  grid = [];

  for (let y = 0; y < rows; y++) {
    grid[y] = [];
    for (let x = 0; x < cols; x++) {
      grid[y][x] = {
        mine: false,
        revealed: false,
        flagged: false,
        count: 0
      };
    }
  }

  // Place mines randomly
  let placed = 0;
  while (placed < mines) {
    let x = floor(random(cols));
    let y = floor(random(rows));
    if (!grid[y][x].mine) {
      grid[y][x].mine = true;
      placed++;
    }
  }

  // Calculate neighbor mine counts
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x].mine) continue;

      let count = 0;

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          let nx = x + dx;
          let ny = y + dy;

          if (
            nx >= 0 && nx < cols &&
            ny >= 0 && ny < rows &&
            grid[ny][nx].mine
          ) count++;
        }
      }

      grid[y][x].count = count;
    }
  }

  calculateLayout();
}

/* LAYOUT */
function calculateLayout() {
  let availableWidth = width * 0.8;
  let availableHeight = height * 0.75;

  let sizeX = availableWidth / cols;
  let sizeY = availableHeight / rows;

  tileSize = min(sizeX, sizeY);

  startX = (width - cols * tileSize) / 2;
  startY = (height - rows * tileSize) / 2 + 20;
}

/* COUNT FLAGS PLACED */
function countFlags() {
  let f = 0;
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++)
      if (grid[y][x].flagged) f++;
  return f;
}

/* REVEAL ALL TILE */
function reveal(x, y) {
  let t = grid[y][x];

  if (t.revealed || t.flagged) return; 

  t.revealed = true;

  if (t.mine) {
    gameOver = true;
    revealAllMines();
    return;
  }

  // recusively reveal tile if 0
  if (t.count === 0) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        let nx = x + dx;
        let ny = y + dy;

        if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
          reveal(nx, ny);
        }
      }
    }
  }

  if (checkWin()) {
    win = true;
    gameOver = true;
    wins[gameState]++; 
  }
}

/* REVEAL ALL MINES ON GAME OVER */
function revealAllMines() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x].mine) {
        grid[y][x].revealed = true;
      }
    }
  }
}

/* WIN CONDITION */
function checkWin() {
  let safeCells = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let t = grid[y][x];
      if (!t.mine && t.revealed) safeCells++;
    }
  }

  return safeCells === (cols * rows - mines);
}