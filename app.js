const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const TILE_SIZE = 10;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const snakeHead = { x: Math.round(CANVAS_WIDTH / TILE_SIZE / 2), y: Math.round(CANVAS_HEIGHT / TILE_SIZE / 2 ) };

function drawSnakeHead() {
  const pixelX = snakeHead.x * TILE_SIZE;
  const pixelY = snakeHead.y * TILE_SIZE;

  ctx.fillStyle = '#4CAF50';

  ctx.fillRect(pixelX, pixelY, TILE_SIZE - 1, TILE_SIZE - 1);
}

drawSnakeHead();