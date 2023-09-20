const canva = document.getElementById("gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.getElementById("scoreText");
const button = document.getElementById("resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 20;
let score = 0;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
  { x: 0, y: 0 },
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}

function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 100);
  } else {
    displayGameOver();
  }
}

function clearBoard() {
  context.fillStyle = boardBackground;
  context.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
  function randomFood(min, max) {
    const randNumb =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNumb;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameWidth - unitSize);
}
console.log(foodX);

function drawFood() {
  context.fillStyle = foodColor;
  context.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);

  //   if food is eaten
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}

function drawSnake() {
  context.fillStyle = snakeColor;
  context.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  console.log(keyPressed);

  const LEFT = 37;
  const UP = 38;
  const RIGHT = 39;
  const DOWN = 40;
}

function checkGameOver() {}

function displayGameOver() {}

function resetGame() {}
