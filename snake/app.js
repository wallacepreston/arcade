// state
let gameState = {};

const newBoard = () => ([
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', '', '', '', ''],
]);
function buildInitialState() {
  gameState.snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    // nextDirection 1 === increment. 0 === stay the same. -1 === decrement.
    // first number is y (up/down)
    // second number is x (left/right) 
    nextDirection: [0, -1]
  };
  gameState.apple = [11, 8];
  gameState.board = newBoard();
}

const addSnakeToBoard = () => {
  gameState.snake.body.map(([y, x]) => {
    gameState.board[y][x] = 'snake';
  })
}

const addAppleToBoard = () => {
  const [y, x] = gameState.apple;
    gameState.board[y][x] = 'apple';
}

const updateBoard = () => {
  gameState.board = newBoard();
  addSnakeToBoard();
  addAppleToBoard();
}

// render
function renderBoard() {
  const boardElem = $('#board');
  boardElem.empty();
  for(let y=0; y<gameState.board.length; ++y){
      const row = gameState.board[y];
      // create a jquery row
      for(let x=0; x<row.length; ++x){
          let column = row[x];
          // create a jquery column, adding the currently stored string at that position as a class.
          const cellElem = $(`<div class="cell ${gameState.board[y][x]}"></div>`)
          cellElem.data('coordinates', [y, x]);
          // append the cell
          boardElem.append(cellElem);
      }
  }
  console.table(gameState.board)
}

const getRandomBoardIndex = (boardSize = 12) => {
  return Math.floor(Math.random() * boardSize);
}

// logic for moving snake and apple
const moveApple = () => {
  // gameState.board[gameState.apple[0]][gameState.apple[1]] = '';
  const y = getRandomBoardIndex();
  const x = getRandomBoardIndex();
  gameState.apple = [y, x];
}

const moveSnake = () => {
  // create new array of 2 nums that will be the first array of the snake's body incremented by the next direction
  const [y, x] = gameState.snake.body[0];
  console.log('y', y, 'x', x)
  const segmentToAdd = [y + gameState.snake.nextDirection[0], x + gameState.snake.nextDirection[1]];
  // if there is room for the snake...
  console.log('segmentToAdd', segmentToAdd)
  console.log('gameState.board[segmentToAdd[0]][segmentToAdd[1]]', gameState.board[segmentToAdd[0]][segmentToAdd[1]])
  if(gameState.board[segmentToAdd[0]][segmentToAdd[1]] !== undefined) {
    // move the snake there
    gameState.snake.body.unshift(segmentToAdd);
    gameState.snake.body.pop();
  } else {
    // change snake direction to turn right
  }
  // unshift a new array to gameState.snake.body
  // pop off the last array from the body

}

const addAndRenderAll = () => {
  updateBoard();
  renderBoard();
}

// maybe a dozen or so helper functions for tiny pieces of the interface

// tick()
function tick(){
  moveSnake();
  moveApple();
  addAndRenderAll();
}

// listeners
function onBoardClick() {
  // update state, maybe with another dozen or so helper functions...

  renderState() // show the user the new state
}

$('.board').on('click'. onBoardClick); // etc

buildInitialState();
addAndRenderAll();