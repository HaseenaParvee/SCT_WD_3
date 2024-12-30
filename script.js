const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.querySelector('.winner-message');
const winnerText = document.getElementById('winner');
const restartButton = document.getElementById('restart-button');
let isCircleTurn = false;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  isCircleTurn = false;
  cells.forEach(cell => {
    cell.textContent = ''; // Clear cell content
    cell.classList.remove('taken');
    cell.addEventListener('click', handleClick, { once: true });
  });
  winnerMessage.classList.add('hidden');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isCircleTurn ? 'O' : 'X';
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.textContent = currentClass; // Display X or O
  cell.classList.add('taken');
}

function swapTurns() {
  isCircleTurn = !isCircleTurn;
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentClass; // Check cell content
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent === 'X' || cell.textContent === 'O';
  });
}

function endGame(draw) {
  if (draw) {
    winnerText.textContent = 'Draw!';
  } else {
    winnerText.textContent = `${isCircleTurn ? 'O' : 'X'} Wins!`;
  }
  winnerMessage.classList.remove('hidden');
}

restartButton.addEventListener('click', startGame);

startGame();
