// VARIABLES 
let gameState = "menu";

let cols, rows, mines;
let grid = [];
let tileSize, startX, startY;
let gameOver = false;
let win = false;

let startTime = 0;
let elapsedTime = 0;

let settingsOpen = false;

let wins = { easy: 0, medium: 0, hard: 0 };

const TOP_UI = 110;
const PADDING = 20;