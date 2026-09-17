const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

const GAME_BOARD_WIDTH = 40;
const GAME_BOARD_HEIGHT = 40;
const TILE_SIZE = 10;
const CANVAS_WIDTH = GAME_BOARD_WIDTH * TILE_SIZE;
const CANVAS_HEIGHT = GAME_BOARD_HEIGHT * TILE_SIZE;
const GAME_SPEED = 200;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const snakeCoordinates = [
  { x: Math.round(GAME_BOARD_WIDTH / 2), y: Math.round(GAME_BOARD_HEIGHT / 2 ) }
];

const foodCoordinates = {
  x: undefined, y: undefined
};

const foodEmojis = [
  "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝",
  "🍅", "🫒", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶️", "🫑", "🥒", "🥬", "🥦", "🧄", "🧅", "🍄", "🥜", "🫘",
  "🍞", "🥐", "🥖", "🫓", "🥨", "🥯", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟",
  "🍕", "🌭", "🥪", "🌮", "🌯", "🫔", "🥙", "🧆", "🥚", "🍳", "🥘", "🍲", "🫕", "🥣", "🥗", "🍿", "🧈",
  "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟",
  "🥠", "🥡", "🦀", "🦞", "🦐", "🦑", "🦪", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫",
  "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "🫖", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂",
  "🥃", "🫗", "🥤", "🧋", "🧃", "🧉", "🧊"
];

let foodIndex = 0;
let direction = 'up';

function generateFood() {

  foodIndex = Math.floor(Math.random() * foodEmojis.length);

  let x, y;
  let isInSnake = true;

  while ( isInSnake ) {
    x = Math.floor(Math.random() * GAME_BOARD_WIDTH);
    y = Math.floor(Math.random() * GAME_BOARD_HEIGHT);

    isInSnake = snakeCoordinates.find( c => c.x === x && c.y === y);
  }

  foodCoordinates.x = x * TILE_SIZE;
  foodCoordinates.y = y * TILE_SIZE;

}

function drawGameBoard() {

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.font = TILE_SIZE + 'px "Apple Color Emoji", "Segoe UI Emoji", sans-serif';
  ctx.fillText(foodEmojis[foodIndex], foodCoordinates.x, foodCoordinates.y);

  snakeCoordinates.forEach( el => {
    const pixelX = el.x * TILE_SIZE;
    const pixelY = el.y * TILE_SIZE;
  
    ctx.fillStyle = '#4CAF50';
  
    ctx.fillRect(pixelX, pixelY, TILE_SIZE - 1, TILE_SIZE - 1);
  });
  
}

function updateSnakeCoordinates () {
  
  let x, y;

  switch ( direction ) {

    case 'up':

      x = snakeCoordinates[0].x;
      y = snakeCoordinates[0].y - 1;

      snakeCoordinates.unshift({x, y});
      snakeCoordinates.pop();

      break;
  
    case 'down':

      x = snakeCoordinates[0].x;
      y = snakeCoordinates[0].y + 1;

      snakeCoordinates.unshift({x, y});
      snakeCoordinates.pop();

    break;
  
    case 'right':

      x = snakeCoordinates[0].x + 1;
      y = snakeCoordinates[0].y;

      snakeCoordinates.unshift({x, y});
      snakeCoordinates.pop();

      break;
  
    case 'left':

      x = snakeCoordinates[0].x - 1;
      y = snakeCoordinates[0].y;

      snakeCoordinates.unshift({x, y});
      snakeCoordinates.pop();

      break;
  
    default:
      break;

  }
}

window.addEventListener('keydown', e => {

  switch ( e.key ) {

    case 'ArrowUp':
      direction = 'up';
      break;
  
    case 'ArrowDown':
      direction = 'down';
      break;
  
    case 'ArrowRight':
      direction = 'right';
      break;
  
    case 'ArrowLeft':
      direction = 'left';
      break;

  }

});

function isGameOver (params) {
  
  let isGameOver = false;

  if ( snakeCoordinates[0].x <= 0 || snakeCoordinates[0].x >= GAME_BOARD_WIDTH - 1 || snakeCoordinates[0].y <= 0 || snakeCoordinates[0].y >= GAME_BOARD_HEIGHT - 1 ) {
    isGameOver = true;
  }

  return isGameOver;

}

generateFood();


function run () {

  updateSnakeCoordinates();
  drawGameBoard();

  if ( isGameOver() ) {
    clearInterval(intervalId);
  }

  console.log(snakeCoordinates[0]);

}

const intervalId = setInterval(run, GAME_SPEED);
